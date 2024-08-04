// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../api/auth";
import "../css/auth.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password);
      if (response.success) {
        setMessage("用户注册成功");
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setMessage(response.message || "用户注册失败");
      }
    } catch (err) {
      console.error(err);
      setMessage("用户注册发生错误");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>注册</h2>
      {error && <p className="auth-error">{error}</p>}
      <div>
        <label className="authlabel">用户名称: </label>
        <input
          type="text"
          value={username}
          placeholder="请输入用户名"
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label className="authlabel">输入密码: </label>
        <input
          type="password"
          value={password}
          placeholder="请输入6~16位的密码"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="button">
        注册
      </button>
    </form>
  );
};

export default RegisterForm;
