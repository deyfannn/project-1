import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-1.png";

export default function Navbar({ username, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo Tempe Kirei" className="nav-logo" />
          <span className="brand-text">Monitoring</span>
        </Link>
      </div>

      <div className="nav-right">
        {username && (
          <div className="dropdown-container">
            <button
              type="button"
              className="username"
              onClick={toggleDropdown}
            >
              {username}
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <button className="logout-btn" onClick={onLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}