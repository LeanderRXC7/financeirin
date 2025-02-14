import React, { useState } from "react";
import * as C from "./styles";
import Grid from "../Grid";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CurrencyInput from "react-currency-input-field";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const generatePieChartData = () => {
    const expenseData = transactionsList.filter((item) => item.expense);

    if (expenseData.length === 0) {
      return null;
    }

    const groupedData = expenseData.reduce((acc, item) => {
      acc[item.category] = acc[item.category]
        ? acc[item.category] + item.amount
        : item.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Despesas por Categoria",
          data: Object.values(groupedData),
          backgroundColor: [
            "#003366",
            "#007BFF",
            "#00A36C",
            "#FF5733",
            "#FFC300",
            "#C70039",
            "#900C3F",
            "#581845",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  };

  const generateChartData = () => {
    const expenseData = transactionsList.filter((item) => item.expense);

    if (expenseData.length === 0) {
      alert("Nenhuma despesa cadastrada para gerar o gráfico.");
      return null;
    }

    const groupedData = expenseData.reduce((acc, item) => {
      acc[item.category] = acc[item.category]
        ? acc[item.category] + item.amount
        : item.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Despesas por Categoria",
          data: Object.values(groupedData),
          backgroundColor: "#003366",
          borderColor: "#003366",
          borderWidth: 1,
        },
      ],
    };
  };

  // Categorias separadas por tipo de transação
  const incomeCategories = ["Salário", "Outras Rendas"];
  const expenseCategories = [
    "Alimentação",
    "Contas",
    "Entretenimento",
    "Transporte",
    "Moradia",
    "Vestuário",
    "Educação",
    "Saúde",
    "Outros",
  ];

  const validateForm = () => {
    let newErrors = {};

    if (!desc || desc.length < 3)
      newErrors.desc = "A descrição deve ter pelo menos 3 caracteres.";
    if (!amount || parseFloat(amount) <= 0)
      newErrors.amount = "O valor deve ser maior que zero.";
    if (!date) newErrors.date = "A data é obrigatória.";
    if (new Date(date) > new Date())
      newErrors.date = "A data não pode ser futura.";
    if (!category) newErrors.category = "Selecione uma categoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const transaction = {
      desc: desc,
      amount: parseFloat(amount),
      expense: isExpense,
      date: date,
      category: category,
      userId: auth.currentUser.uid,
    };

    const saveTransactionToFirestore = async (transaction) => {
      try {
        const docRef = await addDoc(
          collection(db, "Transactions"),
          transaction
        );
        console.log("Transação salva com ID:", docRef.id);
        transaction.id = docRef.id;
        handleAdd(transaction);
      } catch (error) {
        console.error("Erro ao salvar transação:", error);
      }
    };

    saveTransactionToFirestore(transaction);

    setDesc("");
    setAmount("");
    setDate("");
    setCategory("");
    setErrors({});
  };

  return (
    <>
      <C.Title>NOVA TRANSAÇÃO</C.Title>
      <C.Container>
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
          {errors.desc && <C.Error>{errors.desc}</C.Error>}
        </C.InputContent>

        <C.InputContent>
          <C.Label>Valor</C.Label>
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
          {errors.amount && <C.Error>{errors.amount}</C.Error>}
        </C.InputContent>

        <C.InputContent>
          <C.Label>Data</C.Label>
          <C.Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <C.Error>{errors.date}</C.Error>}
        </C.InputContent>

        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            name="group1"
            checked={!isExpense}
            onChange={() => {
              setExpense(false);
              setCategory(""); // Reseta a categoria ao trocar o tipo
            }}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>

          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            checked={isExpense}
            onChange={() => {
              setExpense(true);
              setCategory(""); // Reseta a categoria ao trocar o tipo
            }}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>

        <C.InputContent>
          <C.Label>Categoria</C.Label>
          <C.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {(isExpense ? expenseCategories : incomeCategories).map(
              (cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              )
            )}
          </C.Select>
          {errors.category && <C.Error>{errors.category}</C.Error>}
        </C.InputContent>

        <C.Button onClick={handleSave}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </C.Button>

        {/* <C.Button title="Gere um gráfico das suas despesas" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faChartPie} size="2x" />
        </C.Button> */}
        
      </C.Container>

      {showModal && (
        <C.ModalOverlay>
          <C.ModalContent>
            <C.CloseButton onClick={() => setShowModal(false)}>✖</C.CloseButton>
            <h2>Relatório de Despesas</h2>
            <div
              style={{
                width: "100%",
                maxWidth: "700px",
                height: "400px",
                margin: "20px auto",
              }}
            >
              {generatePieChartData() ? (
                <Pie
                  data={generatePieChartData()}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              ) : (
                <p style={{ textAlign: "center", color: "red" }}>
                  Nenhuma despesa cadastrada.
                </p>
              )}
            </div>
          </C.ModalContent>
        </C.ModalOverlay>
      )}

      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

export default Form;
