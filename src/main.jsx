import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import IsMobileDetector from "./components/provider/IsMobileDetector";
import { loadCategories } from "./redux/thunks/categoryThunks";
import { loadTasks } from "./redux/thunks/taskThunks";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

store.dispatch(loadCategories());
store.dispatch(loadTasks());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <IsMobileDetector>
                <Provider store={store}>
                    <App />
                </Provider>
            </IsMobileDetector>
        </BrowserRouter>
    </React.StrictMode>,
);
