import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  value: string;
}

const initialState: ProductType[] = [];

export const createProducts = createAsyncThunk(
  "products/create",
  async ({
    productData,
    token,
  }: {
    productData: ProductType;
    token: string;
  }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateProducts = createAsyncThunk(
  "products/update",
  async ({
    productData,
    token,
  }: {
    productData: ProductType;
    token: string;
  }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${productData.id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
