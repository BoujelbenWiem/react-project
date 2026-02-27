import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalAmount: 0,
};
//i want a minimal cart that return nothing
const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            // logic to add item to cart
        },
        removeItemFromCart(state, action) {
            // logic to remove item from cart
        },
    },  

            
});

export default cartSlice.reducer;