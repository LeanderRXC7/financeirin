import styled from "styled-components";

export const Table = styled.table`
  width: 90%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
`;

export const ReportButton = styled.button`
  display: block; /* Garante que o margin auto funcione */
  margin: 20px auto 0; /* Centraliza horizontalmente e adiciona margem superior */
  padding: 10px 20px; /* Ajuste conforme necessário */
  margin-bottom: 20px;
  cursor: pointer; /* Indica interatividade */
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #003366;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Alinha verticalmente */
  gap: 10px; /* Espaçamento entre o select e o botão */
  width: 100%;
  label {
    font-size: 16px;
  }
  select {
    padding: 5px;
    font-size: 16px;
    margin-left: 5px;
  }
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  border-bottom: inset;
  padding-bottom: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width + "%" : "auto")};
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export const ConfirmButtonSim = styled.button`
  background-color: #7f0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px; /* Espaçamento entre os botões */

  &:hover {
    background-color: darkred;
  }
`;

export const ConfirmButtonNao = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: darkblue;
  }
`;

