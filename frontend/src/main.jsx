import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/auth/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthInitializer>
                <App />
                <Toaster position="top-right" />
            </AuthInitializer>
        </BrowserRouter>
    </Provider>
);