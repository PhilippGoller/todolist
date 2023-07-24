import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTasksByCategory } from "./taskThunks";
import db from "../../database/connector";

export const loadCategories = createAsyncThunk("category/loadCategories", async () => {
    return await db.table("categories").orderBy("name").toArray();
});

export const addCategory = createAsyncThunk("category/addCategory", async (category) => {
    delete category.id;
    const id = await db.table("categories").add(category);
    return { ...category, id };
});

export const editCategory = createAsyncThunk("category/editCategory", async (category) => {
    const { id, ...update } = category;
    await db.table("categories").update(id ?? "", update);
    return category;
});

export const deleteCategoryWithTasks = id => {
    return dispatch => {
        dispatch(deleteTasksByCategory(id));
        dispatch(deleteCategory(id));
    };
};

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
    await db.table("categories").delete(id);
    return id;
});