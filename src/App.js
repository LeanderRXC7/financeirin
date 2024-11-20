import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTransactionsList(transactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };
    fetchTransactions();
  }, []);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

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
    console.log("Transação salva localmente (apenas para fins de depuração).");
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList}/>
      <GlobalStyle />
    </>
  );
};

export default App;
