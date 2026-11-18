import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer
  }
});