import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Login from "./Logar";
import Register from "./Register";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { suggestSavings } from "./geminiAI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Componente para estilizar as sugestões
const StyledSuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return <p>Nenhuma sugestão disponível.</p>;
  }

  return (
    <div>
      {suggestions.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ color: "#003366", marginBottom: "10px" }}>
            Categoria: {item.categoria}
          </h3>
          <p style={{ margin: "10px 0", fontStyle: "italic" }}>
            <strong>Análise:</strong> {item.analise}
          </p>
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            {item.recomendacoes.map((recomendacao, idx) => (
              <li key={idx} style={{ lineHeight: "1.6" }}>
                {recomendacao}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Monitora se o usuário está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Busca as transações do usuário logado
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        const q = query(
          collection(db, "Transactions"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordena as transações da mais recente para a mais antiga
        const sortedTransactions = transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTransactionsList(sortedTransactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, [user]);

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

  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleGenerateSuggestions = async () => {
    const dataToAnalyze =
      filteredTransactions.length > 0 ? filteredTransactions : transactionsList; //Se o filtro foi limpo, usa todas as transações
  
    const expensesOnly = dataToAnalyze.filter(
      (transaction) => transaction.expense === true || transaction.expense === "true"
    );
  
    if (expensesOnly.length === 0) {
      alert("Nenhuma saída encontrada para análise.");
      return;
    }
  
    setLoadingSuggestions(true);
    try {
      const suggestionsData = await suggestSavings(expensesOnly);
      setSuggestions(suggestionsData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao gerar sugestões:", error);
      alert("Não foi possível gerar sugestões no momento.");
    } finally {
      setLoadingSuggestions(false);
    }
  };
  

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Header />
                <Resume income={income} expense={expense} total={total} />
                <Form
                  handleAdd={handleAdd}
                  transactionsList={transactionsList}
                  setTransactionsList={setTransactionsList}
                  filteredTransactions={filteredTransactions}
                  setFilteredTransactions={setFilteredTransactions}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "25px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#cc0000")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ff4d4d")
                    }
                  >
                    Sair
                  </button>
                </div>

                <div
                  style={{ position: "fixed", bottom: "20px", right: "20px" }}
                >
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
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#007BFF")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#003366")
                    }
                    disabled={loadingSuggestions}
                  >
                    {loadingSuggestions ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faPiggyBank} size="2x" />
                    )}
                  </button>
                </div>
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <h2 style={{ marginBottom: "20px" }}>
                    Sugestões de Economia
                  </h2>
                  <StyledSuggestions suggestions={suggestions} />
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      marginTop: "20px",
                      padding: "10px 20px",
                      backgroundColor: "#003366",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Fechar
                  </button>
                </Modal>
                <GlobalStyle />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
