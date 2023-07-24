import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../database/connector";

export const loadTasks = createAsyncThunk("task/loadTasks", async () => {
    return await db.table("tasks").orderBy("date").toArray();
});

export const addTask = createAsyncThunk("task/addTask", async (task) => {
    delete task.id;
    const id = await db.table("tasks").add(task);
    return { ...task, id };
});

export const editTask = createAsyncThunk("task/editTask", async (task) => {
    const { id, ...update } = task;
    await db.table("tasks").update(id ?? "", update);
    return task;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
    await db.table("tasks").delete(id);
    return id;
});

export const deleteTasksByCategory = createAsyncThunk("task/deleteTasksByCategory", async (id) => {
    await db.table("tasks").where("category").equals(id).delete();
    return id;
});