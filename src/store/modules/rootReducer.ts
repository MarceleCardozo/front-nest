import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";

export default combineReducers({
  products: productsSlice,
});
