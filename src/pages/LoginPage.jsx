// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";

import "../css/auth.css";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="authContainer">
      <h1 className="authHeader">兴趣圈</h1>
      <div className="authForm">
        <LoginForm onLoginSuccess={onLoginSuccess} />
        <button className="authRedirectButton" onClick={handleRegisterClick}>
          前往注册
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
