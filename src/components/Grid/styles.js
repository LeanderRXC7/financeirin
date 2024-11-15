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
  margin-left: 205px;
  margin-bottom: 20px;
  padding: 10px 20px;
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
  gap: 10px;
  margin-bottom: 20px;
  margin-left: 205px;
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
