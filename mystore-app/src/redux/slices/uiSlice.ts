import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: "ui",
    initialState: {
        notification :null as { status: "success" | "error"; title: string; message: string } | null
    },
    reducers: {
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        },
        hideNotification(state) {
            state.notification = null;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;