import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";

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

const Login: React.FC = () => {
  return (
    <StyledContainer>
      <StyledForm>
        <StyledTypography variant="h4">LOGIN</StyledTypography>
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
