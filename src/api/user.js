// src/api/user.js
import axios from "axios";

const API_URL = "http://localhost:7001/user"; //硬编码后端端口

export const getId = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/?username=${username}`);
    return response.data.id;
  } catch (error) {
    return null;
  }
};

export const addActivity = async (userid, increment) => {
  try {
    const response = await axios.post(`${API_URL}/addActivity`, {
      userid,
      increment,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.post(`${API_URL}/fetchUsers`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
