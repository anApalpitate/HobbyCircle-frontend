// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:7001/auth"; //硬编码后端端口

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("注册失败");
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("登录失败");
  }
};
