import React, { useState } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import Modal from "../Modal";
import ConfirmModal from "../ConfirmModal";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Grid = ({ itens, setItens }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sortOption, setSortOption] = useState("category");
  const [reportType, setReportType] = useState("monthly");
  const [selectedItemID, setSelectedItemID] = useState(null);

  const onDelete = (ID) => {
    setSelectedItemID(ID);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItemID) return;

    const newArray = itens.filter(
      (transaction) => transaction.id !== selectedItemID
    );
    setItens(newArray);

    const removeTransactionFromFirestore = async () => {
      try {
        const docRef = doc(db, "Transactions", selectedItemID);
        await deleteDoc(docRef);
        console.log("Transação removida do Firestore!");
      } catch (error) {
        console.error("Erro ao remover transação:", error);
      }
    };
    await removeTransactionFromFirestore();
    setShowConfirmModal(false);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 500); // 3000ms = 3 segundos
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false); // Fechar modal de confirmação sem excluir
  };

  const handleReport = () => {
    const filteredItems = itens.filter((item) => {
      if (!item.date) return false;
      const [year, month, day] = item.date.split("-");
      const itemDate = new Date(year, month - 1, day);

      if (reportType === "monthly") {
        return (
          parseInt(month) === parseInt(selectedMonth) &&
          parseInt(year) === parseInt(selectedYear) &&
          item.expense
        );
      } else if (reportType === "weekly") {
        const currentDate = new Date();
        const selectedDate = new Date(selectedYear, selectedMonth - 1);
        const weekNumber = Math.ceil((itemDate.getDate() - 1) / 7);
        const selectedWeek = Math.ceil((currentDate.getDate() - 1) / 7);

        return (
          parseInt(month) === parseInt(selectedMonth) &&
          parseInt(year) === parseInt(selectedYear) &&
          weekNumber === selectedWeek &&
          item.expense
        );
      }
      return false;
    });

    let report = "";

    if (sortOption === "category") {
      const groupedByCategory = filteredItems.reduce((acc, item) => {
        const amount = parseFloat(item.amount) || 0;
        acc[item.category] = acc[item.category]
          ? acc[item.category] + amount
          : amount;
        return acc;
      }, {});

      report = Object.entries(groupedByCategory)
        .map(([category, total]) => `${category}: R$ ${total.toFixed(2)}`)
        .join("\n");
    } else if (sortOption === "period") {
      const sortedByDate = [...filteredItems].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      report = sortedByDate
        .map(
          (item) =>
            `${item.date}: ${item.desc} - R$ ${parseFloat(item.amount).toFixed(
              2
            )}`
        )
        .join("\n");
    }

    setReportContent(report);
    setShowModal(true);
  };

  return (
    <div>
      <C.Title>TRANSAÇÕES</C.Title>
      <C.Table>
        <C.Thead>
          <C.Tr>
            <C.Th width={25}>Descrição</C.Th>
            <C.Th width={10}>Valor</C.Th>
            <C.Th width={10}>Data</C.Th>
            <C.Th width={25}>Categoria</C.Th>
            <C.Th width={10} alignCenter>
              Tipo
            </C.Th>
            <C.Th width={10}></C.Th>
          </C.Tr>
        </C.Thead>
        <C.Tbody>
          {itens?.map((item, index) => (
            <GridItem key={index} item={item} onDelete={onDelete} />
          ))}
        </C.Tbody>
      </C.Table>
      <C.FilterContainer>
        <C.SelectContainer>
          <label>
            Tipo de relatório:
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="monthly">Mensal</option>
              <option value="weekly">Semanal</option>
            </select>
          </label>
          <label>
            Mês:
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ano:
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Ordenar por:
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="category">Categoria</option>
              <option value="period">Período</option>
            </select>
          </label>
        </C.SelectContainer>
        <C.ReportButton onClick={handleReport}>
          RELATÓRIO DE GASTOS
        </C.ReportButton>
      </C.FilterContainer>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Relatório de Gastos
        </h2>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          {reportContent.split("\n").map((line, index) => (
            <p
              key={index}
              style={{ margin: "5px 0", fontSize: "19px", color: "black" }}
            >
              {line}
            </p>
          ))}
        </div>
      </Modal>

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <h2>Tem certeza que deseja excluir essa transação?</h2>
        <C.ConfirmButtonSim onClick={handleConfirmDelete}>
          Sim
        </C.ConfirmButtonSim>
        <C.ConfirmButtonNao
          className="confirm-btn-nao"
          onClick={handleCancelDelete}
        >
          Não
        </C.ConfirmButtonNao>
      </ConfirmModal>

      <ConfirmModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <h2>Exclusão realizada com sucesso!</h2>
      </ConfirmModal>
    </div>
  );
};

export default Grid;
