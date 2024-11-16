import React, { useState } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import Modal from "../Modal";

const Grid = ({ itens, setItens }) => {
  const [showModal, setShowModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual (1-12)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual

  const onDelete = (ID) => {
    const newArray = itens.filter((transaction) => transaction.id !== ID);
    setItens(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
  };

  const handleReport = () => {
    // Filtrar itens com base no mês e ano selecionados
    const filteredItems = itens.filter((item) => {
      if (!item.date) return false;
      const [year, month] = item.date.split("-");
      return (
        parseInt(month) === parseInt(selectedMonth) &&
        parseInt(year) === parseInt(selectedYear) &&
        item.expense
      );
    });

    // Agrupar por categoria e garantir que os valores sejam números
    const groupedByCategory = filteredItems.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0; // Garantir que o valor seja um número
      acc[item.category] = acc[item.category]
        ? acc[item.category] + amount
        : amount;
      return acc;
    }, {});

    // Exibir o relatório
    const report = Object.entries(groupedByCategory)
      .map(([category, total]) => `${category}: R$ ${total.toFixed(2)}`) // Garantir que total seja número
      .join("\n");

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
            <C.Th width={10}>Data</C.Th> {/* Nova coluna para a data */}
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
      </C.SelectContainer>
      <C.ReportButton onClick={handleReport}>
        RELATÓRIO DE GASTOS
      </C.ReportButton>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Gastos do mês</h2>
        <pre>{reportContent}</pre>
      </Modal>
    </div>
  );
};

export default Grid;
