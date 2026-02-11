import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Cashflow from "./components/Cashflow";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.split(".").length === 3) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
          setUsername(decoded.username);

          const timeout = decoded.exp * 1000 - Date.now();
          setTimeout(() => handleLogout(), timeout);
        } else {
          handleLogout();
        }
      } catch (err) {
        console.error("Token tidak valid:", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (name, token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      {isLoggedIn && <Navbar username={username} onLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Cashflow username={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        <Route
          path="/cashflow"
          element={isLoggedIn ? <Cashflow /> : <Navigate to="/login" />}
        />


      </Routes>
    </Router>
  );
}
