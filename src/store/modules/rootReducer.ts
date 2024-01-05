import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import userSlice from "./user/userSlice";

export default combineReducers({
  products: productsSlice,
  user: userSlice,
});
