import React, { useState } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    content: "🔒";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(true);
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);

        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
        setShowError(true);

        setTimeout(() => {
          setError("");
          setShowError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in. Please try again later.");
      setShowError(true);

      setTimeout(() => {
        setError("");
        setShowError(false);
      }, 3000);
    }
  }

  return (
    <StyledContainer>
      <StyledForm>
        <StyledTypography variant="h4">LOGIN</StyledTypography>
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
          Entrar
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
