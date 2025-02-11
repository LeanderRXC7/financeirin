import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #003366;
`;

export const FormWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
`;

export const Title = styled.h2`
  color: #003366;
  margin-bottom: 20px;
  font-family: 'Poppins', Sans-Serif;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-family: 'Poppins', Sans-Serif;

  &:hover {
    background-color: #007bff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
`;

export const SuccessMessage = styled.p`
  color: green;
  margin: 5px 0;
`;

export const LinkText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-family: 'Poppins', Sans-Serif;

  a {
    color: #003366;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
