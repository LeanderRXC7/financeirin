import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  ErrorMessage,
  LinkText,
} from "./stylesAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redireciona para home após login
    } catch (err) {
      setError("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <Container>
     
      <FormWrapper>
      <Title>FINANCEIRIN'</Title> 
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
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
          <Button type="submit">Entrar</Button>
        </form>
        <LinkText>Não tem conta? <a href="/register">Cadastre-se</a></LinkText>
      </FormWrapper>
    </Container>
  );
};

export default Login;
