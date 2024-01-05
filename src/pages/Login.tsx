import React, { useState } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../store/modules/user/userSlice";
import { useAppDispatch } from "../store/hooks";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const StyledForm = styled.form`
  width: 20%;
  height: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    width: 50%;
  }

  @media screen and (max-width: 1200px) {
    width: 40%;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #0c0c0c;
    color: white;
    border-radius: 5px;
    &:hover {
      background-color: #333;
    }
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  &::before {
    margin-right: 10px;
  }
`;

const StyledAlert = styled(Alert)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  opacity: 0;
  animation: ${fadeIn} 10s ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 10s ease-in-out;
  }
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(true);
  const [signup, setSignup] = useState(false);

  async function login() {
    if (!signup) {
      try {
        await dispatch(loginUser({ username, password }));

        navigate("/");
      } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred while logging in. Please try again later.");
        setShowError(true);

        setTimeout(() => {
          setError("");
          setShowError(false);
        }, 3000);
      }
    } else {
      try {
        const response = await dispatch(
          signupUser({ username, email, password })
        );
        console.log(response);

        setSignup(!signup);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  }

  return (
    <StyledContainer>
      <StyledForm>
        <StyledTypography variant="h4">
          {signup ? "CRIAR CONTA" : "LOGIN"}
        </StyledTypography>
        {error && (
          <StyledAlert
            className={showError ? "fade-out" : ""}
            variant="filled"
            severity="error"
          >
            {error}
          </StyledAlert>
        )}
        <StyledTextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {signup && (
          <StyledTextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <StyledTextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" fullWidth onClick={login}>
          {signup ? "Criar conta" : "Entrar"}
        </StyledButton>

        <Typography
          onClick={() => setSignup(!signup)}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            mt: 2,
          }}
          variant="subtitle2"
        >
          {signup
            ? "Já possui conta? Vá para Login"
            : "Não tem conta? Cadastre-se"}
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
