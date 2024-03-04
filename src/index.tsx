import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ThemeProvider} from "./components/context/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';




const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </React.StrictMode>
    );
}
