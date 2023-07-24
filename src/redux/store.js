import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        categories: categoryReducer
    }
});

store.subscribe(() => console.log(store.getState()));

export default store;