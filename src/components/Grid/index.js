import React, { useState } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import Modal from "../Modal";

const Grid = ({ itens, setItens }) => {
  const [showModal, setShowModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual (1-12)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual
  const [sortOption, setSortOption] = useState("category"); // Opção de ordenação
  const [reportType, setReportType] = useState("monthly"); // Tipo de relatório

  const onDelete = (ID) => {
    const newArray = itens.filter((transaction) => transaction.id !== ID);
    setItens(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
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
      const sortedByDate = [...filteredItems].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );

      report = sortedByDate
        .map(
          (item) =>
            `${item.date}: ${item.category} - R$ ${parseFloat(item.amount).toFixed(
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

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Relatório de Gastos</h2>
        <pre>{reportContent}</pre>
      </Modal>
    </div>
  );
};

export default Grid;
