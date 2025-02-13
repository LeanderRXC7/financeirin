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

export const ButtonChart = styled.button`
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Aparece acima de todo o conteúdo */
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  position: relative; /* Necessário para posicionar o botão "X" corretamente */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: black; /* Cor preta */
  transition: 0.2s ease-in-out;

  &:hover {
    color: gray;
  }
`;


