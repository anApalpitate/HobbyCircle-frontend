// src/pages/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";
import "../css/auth.css";
const RegisterPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="authContainer">
      <h1 className="authHeader">兴趣圈</h1>
      <div className="authForm">
        <RegisterForm />
        <button className="authRedirectButton" onClick={handleLoginClick}>
          返回登录
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
