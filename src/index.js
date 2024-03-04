import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./contetxt/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
var rootElement = document.getElementById('root');
if (rootElement) {
    var root = ReactDOM.createRoot(rootElement);
    root.render(_jsx(React.StrictMode, { children: _jsx(ThemeProvider, { children: _jsx(RouterProvider, { router: router }) }) }));
}
