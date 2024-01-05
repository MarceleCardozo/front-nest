import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginUserType {
  username: string;
  password: string;
}

export interface CreateUserType {
  username: string;
  email: string;
  password: string;
}

const initialState: LoginUserType = {
  username: "",
  password: "",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: LoginUserType) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData: CreateUserType) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (_state, action) => {
        localStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(loginUser.rejected, (_state, action) => {
        console.error("Error during login:", action.payload);
      })
      .addCase(signupUser.fulfilled, (_state, action) => {
        console.log(action.payload);
      })
      .addCase(signupUser.rejected, (_state, action) => {
        console.error("Error during signup:", action.payload);
      });
  },
});

export default userSlice.reducer;
