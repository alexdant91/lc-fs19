import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        all: null,
    },
    reducers: {
        setAll: (state, {payload}) => {
            state.all = payload
        }
    }
});

export const { setAll } = productSlice.actions;

export default productSlice.reducer;