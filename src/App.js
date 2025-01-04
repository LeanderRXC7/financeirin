import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { suggestSavings } from "./geminiAI"; // Importa a função de sugestões para uso da IA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons"; // Ícone de robô

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState(""); // Estado para armazenar as sugestões da IA
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // Estado para exibir o carregamento das sugestões

  // Busca transações do Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactionsList(transactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Calcula entrada, saída e total
  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  }, [transactionsList]);

  // Função para adicionar nova transação
  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);
    console.log("Transação salva localmente (apenas para fins de depuração).");
  };

  // Função para gerar sugestões de economia com IA
  const handleGenerateSuggestions = async () => {
    // Filtrar apenas saídas (gastos)
    const expensesOnly = transactionsList.filter(
      (transaction) => transaction.expense
    );

    if (expensesOnly.length === 0) {
      alert("Nenhuma saída cadastrada para análise.");
      return;
    }

    setLoadingSuggestions(true); // Ativa o estado de carregamento
    try {
      const suggestionsText = await suggestSavings(expensesOnly); // Envia apenas as saídas para análise pela IA
      setSuggestions(suggestionsText);
    } catch (error) {
      console.error("Erro ao gerar sugestões:", error);
      alert("Não foi possível gerar sugestões no momento.");
    } finally {
      setLoadingSuggestions(false); // Desativa o estado de carregamento
    }
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
      />

      {/* Botão para gerar sugestões */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <button
          onClick={handleGenerateSuggestions}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#003366",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#003366")}
        >
          <FontAwesomeIcon icon={faRobot} size="2x" />
        </button>
      </div>

      {/* Exibição das sugestões */}
      {suggestions && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Sugestões de Economia</h2>
          {suggestions.split("\n").map((line, index) => (
            <p key={index} style={{ margin: "5px 0", lineHeight: "1.6" }}>
              {line.trim()}
            </p>
          ))}
        </div>
      )}

      <GlobalStyle />
    </>
  );
};

export default App;
