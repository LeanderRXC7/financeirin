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
  margin: 5px auto 0; /* Centraliza horizontalmente e adiciona margem superior */
  padding: 10px 20px; /* Ajuste conforme necessário */
  //margin-bottom: 20px;
  cursor: pointer; /* Indica interatividade */
  background-color: #FFF;
  color: #003366;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
   //background-color: #7b7b7b;
  }
`;

export const SelectContainer = styled.div`
justify-content: center;
  gap: 10px; /* Espaçamento entre o select e o botão */
  width: 100%;
  label {
    font-size: 16px;
    color: white;
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

export const Td = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const Th = styled.th`
  border-bottom: inset;
  padding-bottom: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width + "%" : "auto")};
`;

export const Title = styled.h2`
  text-align: center;
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

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #003366; /* Cor de fundo da caixa */
  padding: 20px; /* Espaçamento interno */
  border: 1px solid #ccc; /* Borda da caixa */
  border-radius: 5px;
  margin: 20px auto; /* Margem para separação */
  max-width: 700px;

  & > div {
    display: flex;
    flex-wrap: wrap; /* Para quebrar linhas caso necessário */
    gap: 10px; /* Espaçamento entre os itens */
    margin-bottom: 20px; /* Espaço entre os filtros e o botão */
  }
`;

export const FilterIcon = styled.div`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  margin-left: 960px; /* Move o ícone um pouco para a direita */
  font-size: 25px; /* Reduz o tamanho do ícone */
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const FilterDropdown = styled.div`
  position: absolute; /* Posiciona o dropdown logo abaixo do ícone */
  right: 250px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 17px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 10;
`;

export const FilterButtons = styled.div`
  justify-content: space-between;
  margin-top: 10px;

  button {
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;

    &:first-child {
      background-color: #4caf50;
      color: white;

      &:hover {
        background-color: #45a049;
      }
    }

    &:last-child {
      background-color: #d9534f;
      color: white;

      &:hover {
        background-color: #c9302c;
      }
    }
  }
`;


