import { createSlice } from "@reduxjs/toolkit";

const productCartSlice = createSlice({
    name: "productCart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state = state.filter(item => item.id !== action.payload);
        }
    },
});

export const {addToCart, removeFromCart} = productCartSlice.actions;

export default productCartSlice.reducer;