import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
  LinkText,
} from "./stylesAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [snome, setSNome] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redireciona para home após 2s
    } catch (err) {
      setError("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>FINANCEIRIN'</Title>
        <Title>Cadastro</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Cadastro realizado com sucesso! Redirecionando...</SuccessMessage>}
        <form onSubmit={handleRegister}>
        <Input
            type="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="snome"
            placeholder="Sobre nome"
            value={snome}
            onChange={(e) => setSNome(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <LinkText>Já tem uma conta? <a href="/login">Faça login</a></LinkText>
      </FormWrapper>
    </Container>
  );
};

export default Register;
