import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/logo-1.png";
import "../App.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://project-bgn-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.token);

        const authRes = await fetch("https://project-bgn-production.up.railway.app/check-auth", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (authRes.ok) {
          const authData = await authRes.json();
          onLogin(authData.username);
          navigate("/");
        } else {
          alert("Gagal mengambil data pengguna.");
        }
      } else {
        alert(data.message || "Username atau password salah");
      }
    } catch (err) {
      console.error("Error saat login:", err);
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <img src={logo} alt="Tempe Kirei Logo" className="login-logo" />
        <h2 className="login-title">Sign in to your account</h2>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
