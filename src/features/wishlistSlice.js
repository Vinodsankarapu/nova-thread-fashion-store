import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: JSON.parse(localStorage.getItem("wishlist")) || [],
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find(
        (product) => product.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },

    removeFromWishlist: (state, action) => {
      const updated = state.filter(
        (product) => product.id !== action.payload
      );

      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
