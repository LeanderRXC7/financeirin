import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  width: 98%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 15px 0px;
  gap: 10px;

  @media (max-width: 750px) {
    display: grid;
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label``;

export const Input = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 5px 0.5px;
  font-size: 15px;
  border: 1px solid #ccc;

  &[type="date"] { /* Estilo específico para campos de data */
    width: 110px; /* Mesmo tamanho dos outros campos */
    height: 17px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-left: 20px;
    margin-right: 5px;
    accent-color: black;
    margin-top: 0;
  }
`;

export const Button = styled.button`
  padding: 0px 15px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background-color: #003366;
`;

export const Select = styled.select`
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 24px;
  color: #333;
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;