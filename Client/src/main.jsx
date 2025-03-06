import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Todos } from "./components/Todos";
import Register from "./components/Register";
import Login from "./components/Login";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
);
