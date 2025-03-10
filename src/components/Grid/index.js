import React, { useState, useEffect } from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import Modal from "../Modal";
import ConfirmModal from "../ConfirmModal";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  const [filteredItens, setFilteredItens] = useState(itens);
  const [filterType, setFilterType] = useState("all"); // 'all', 'period', 'category', 'search'
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [showChartModal, setShowChartModal] = useState(false);
  const [chartData, setChartData] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FEF",
    "#F56A79",
  ];

  const handleGenerateChart = () => {
    const filteredItems = itens.filter((item) => {
      if (!item.date) return false;
      const [year, month] = item.date.split("-");
      return (
        parseInt(month) === parseInt(selectedMonth) &&
        parseInt(year) === parseInt(selectedYear) &&
        item.expense
      );
    });

    const groupedByCategory = filteredItems.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0;
      acc[item.category] = acc[item.category]
        ? acc[item.category] + amount
        : amount;
      return acc;
    }, {});

    const chartDataFormatted = Object.entries(groupedByCategory).map(
      ([category, total]) => ({
        name: category,
        value: total,
      })
    );

    setChartData(chartDataFormatted);
    setShowChartModal(true);
  };

  useEffect(() => {
    setFilteredItens(itens);
  }, [itens]);

  const handleFilter = () => {
    let filteredData = itens;

    if (filterType === "period") {
      filteredData = itens.filter((item) => {
        if (!item.date) return false;
        const [year, month] = item.date.split("-");
        return (
          parseInt(month) === parseInt(selectedMonth) &&
          parseInt(year) === parseInt(selectedYear)
        );
      });
    } else if (filterType === "category" && selectedCategory) {
      filteredData = itens.filter((item) => item.category === selectedCategory);
    } else if (filterType === "search") {
      filteredData = itens.filter((item) =>
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItens(filteredData);
    setShowFilterMenu(false);
  };

  const handleClearFilters = () => {
    setFilterType("all");
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
    setSelectedCategory("");
    setSearchTerm("");
    setFilteredItens(itens);
    setShowFilterMenu(false);
  };

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
    }, 2000);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
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

      <C.FilterIcon onClick={() => setShowFilterMenu(!showFilterMenu)}>
        <FontAwesomeIcon icon={faFilter} size="sm" />
      </C.FilterIcon>
      {showFilterMenu && (
        <C.FilterDropdown>
          <label>
            Filtrar por:
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="period">Período</option>
              <option value="category">Categoria</option>
            </select>
          </label>

          {filterType === "period" && (
            <>
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
            </>
          )}

          {filterType === "category" && (
            <label>
              Categoria:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {Array.from(new Set(itens.map((item) => item.category))).map(
                  (cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </label>
          )}

          <C.FilterButtons>
            <button onClick={handleFilter}>Aplicar</button>
            <button onClick={handleClearFilters}>Limpar</button>
          </C.FilterButtons>
        </C.FilterDropdown>
      )}

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
          {filteredItens.length > 0 ? (
            filteredItens.map((item, index) => (
              <GridItem key={index} item={item} onDelete={onDelete} />
            ))
          ) : (
            <C.Tr>
              <C.Td
                colSpan="6"
                style={{ textAlign: "center", padding: "10px" }}
              >
                Nenhuma transação encontrada.
              </C.Td>
            </C.Tr>
          )}
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
        <C.ButtonContainer>
          <C.ReportButton onClick={handleReport}>
            RELATÓRIO DE GASTOS
          </C.ReportButton>

          <C.ReportButton onClick={handleGenerateChart} title="Gerar Gráfico">
            <FontAwesomeIcon icon={faChartPie} size="xl" />
          </C.ReportButton>
        </C.ButtonContainer>
      </C.FilterContainer>

      <Modal show={showChartModal} onClose={() => setShowChartModal(false)}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Distribuição de Gastos
        </h2>
        <div style={{ width: "100%", height: 500 }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "black" }}>
              Nenhum dado disponível para o gráfico.
            </p>
          )}
        </div>
      </Modal>

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
