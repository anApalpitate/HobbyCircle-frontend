// src/api/inf.js
import axios from "axios";

const API_URL = "http://localhost:7001/inf";

// 获取通知
export const fetchInfs = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/fetchInfs/${userID}`);
    return response.data;
  } catch (error) {
    console.error("获取通知失败:", error);
    throw error;
  }
};

// 删除指定通知
export const deleteInf = async (infID) => {
  try {
    await axios.get(`${API_URL}/delete/${infID}`);
  } catch (error) {
    console.error("删除通知失败:", error);
    throw error;
  }
};

// 清空用户的所有通知
export const clearAllInf = async (userID) => {
  try {
    await axios.get(`${API_URL}/clearAll/${userID}`);
  } catch (error) {
    console.error("清空通知失败:", error);
    throw error;
  }
};
