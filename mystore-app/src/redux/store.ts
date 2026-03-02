import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
    },
})

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();