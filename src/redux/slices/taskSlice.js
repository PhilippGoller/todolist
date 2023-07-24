import { createSlice } from "@reduxjs/toolkit";
import { loadTasks, addTask, editTask, deleteTask, deleteTasksByCategory} from "../thunks/taskThunks";

const initialState = {
    items: []
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(loadTasks.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.date > action.payload.date);
                
                if(index !== -1) {
                    state.items.splice(index, 0, action.payload);
                    return;
                }
    
                state.items.push(action.payload);
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);

                if(index === -1) {
                    return;
                }

                if(state.items[index].date === action.payload.date) {
                    state.items[index] = action.payload;
                    return;
                }

                const tasks = state.items.filter(item => item.id !== action.payload.id);
                const newIndex = tasks.findIndex(item => item.date > action.payload.date);
                
                if(newIndex !== -1) {
                    tasks.splice(newIndex, 0, action.payload);
                } else {
                    tasks.push(action.payload);
                }

                state.items = tasks;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteTasksByCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.category !== action.payload);
            });
    }
});

export default taskSlice.reducer;