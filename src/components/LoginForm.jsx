// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth";
import "../css/auth.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const AdminButtonHidden = true; // 管理员登录按钮是否隐藏

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  const handleAdminLogin = async () => {
    await handleLogin("admin", "123456");
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      if (response.success) {
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("token", response.data.token);

        navigate("/home");
      } else {
        setError(response.message || "用户名或密码错误");
      }
    } catch (err) {
      console.error("handleLogin error:", err);
      setError("登录过程发生错误");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>登录</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label className="authlabel">用户名称: </label>
        <input
          type="text"
          value={username}
          placeholder="用户名须唯一 "
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label className="authlabel">输入密码: </label>
        <input
          type="password"
          value={password}
          placeholder="密码为6~16位"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="button">
        登录
      </button>
      <button
        type="button"
        onClick={handleAdminLogin}
        className="button"
        hidden={AdminButtonHidden}
      >
        以管理员身份快速登录(临时)
      </button>
    </form>
  );
};

export default LoginForm;
