import React, { useState } from "react";
import * as C from "./styles";
import Grid from "../Grid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CurrencyInput from "react-currency-input-field";

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Rendas", "Alimentação", "Contas", "Entretenimento", "Transporte", "Moradia", "Vestuário", "Educação", "Saúde", "Outros"];

  const handleSave = () => {
    if (!desc || !amount || !category) {
      alert("Informe a descrição, o valor e a categoria!");
      return;
    } else if (parseFloat(amount) < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const transaction = {
      desc: desc,
      amount: parseFloat(amount), // Converte o valor para número
      expense: isExpense,
      date: date,
      category: category,
    };

    const saveTransactionToFirestore = async (transaction) => {
      try {
        const docRef = await addDoc(collection(db, "Transactions"), transaction);
        console.log("Transação salva com ID:", docRef.id);
        transaction.id = docRef.id;
        handleAdd(transaction); // Atualiza o estado local
      } catch (error) {
        console.error("Erro ao salvar transação:", error);
      }
    };
    saveTransactionToFirestore(transaction);

    setDesc("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <>
      <C.Title>NOVA TRANSAÇÃO</C.Title>
      <C.Container>
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Valor</C.Label>
          {/* Campo com máscara de reais */}
          <CurrencyInput
            value={amount}
            decimalsLimit={2}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            onValueChange={(value) => setAmount(value)}
            placeholder="R$ 0,00"
            style={{
              width: "100%",
              padding: "5px 0.5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Data</C.Label>
          <C.Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Categoria</C.Label>
          <C.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </C.Select>
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setExpense(false)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setExpense(true)}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={handleSave}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </C.Button>
      </C.Container>
      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

export default Form;
