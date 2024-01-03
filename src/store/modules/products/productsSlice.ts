import { createSlice } from "@reduxjs/toolkit";

export interface ProductType {
  id?: string;
  name: string;
  description: string;
  value: string;
}

const initialState: ProductType[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
