import React from "react";
import * as C from "./styles";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  // Função para formatar a data
  const formatDate = (date) => {
    if (!date) return ""; // Garantia contra valores inválidos
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Função para formatar o valor como moeda brasileira
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <C.Tr>
      <C.Td>{item.desc}</C.Td>
      <C.Td>{formatCurrency(item.amount)}</C.Td> {/* Formata o valor */}
      <C.Td>{formatDate(item.date)}</C.Td> {/* Exibindo a data */}
      <C.Td>{item.category}</C.Td>
      <C.Td alignCenter>
        {item.expense ? (
          <FaRegArrowAltCircleDown color="red" />
        ) : (
          <FaRegArrowAltCircleUp color="green" />
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item.id)} />
      </C.Td>
    </C.Tr>
  );
};

export default GridItem;
