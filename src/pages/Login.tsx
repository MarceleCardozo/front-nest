import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  width: 20%;
  height: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 15px;
    background-color: black;
    color: white;
    &:hover {
      background-color: #333;
    }
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 15px;
`;

const Login: React.FC = () => {
  return (
    <StyledContainer>
      <StyledForm>
        <StyledTypography variant="h4">Login</StyledTypography>
        <StyledTextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
        />
        <StyledTextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
        />
        <StyledButton variant="contained" fullWidth>
          Entrar
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
