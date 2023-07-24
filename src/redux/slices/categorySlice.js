import { createSlice } from "@reduxjs/toolkit";
import { loadCategories, addCategory, editCategory, deleteCategory } from "../thunks/categoryThunks";

const initialState = {
    items: []
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);

                if(index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default categorySlice.reducer;