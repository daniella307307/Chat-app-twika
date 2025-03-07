import React,{ useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate replace to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
