// src/api/circle.js
import axios from "axios";

const API_URL = "http://localhost:7001/circle"; // 硬编码后端端口

// 获取兴趣圈列表
export const getCircles = async () => {
  try {
    const response = await axios.get(`${API_URL}/getCircles`);
    return response.data;
  } catch (error) {
    console.log("getCircles error:", error.message);
    throw new Error("获取兴趣圈失败");
  }
};

// 创建兴趣圈
export const createCircle = async (
  name,
  description,
  imageID,
  creatorID,
  foundTime
) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      name,
      description,
      imageID,
      creatorID,
      foundTime,
    });
    return response.data;
  } catch (error) {
    console.log("兴趣圈创建失败", error.message);
    throw new Error("创建兴趣圈失败");
  }
};

export const getCircleById = async (circleId) => {
  try {
    const response = await axios.get(`${API_URL}/getByID/${circleId}`);
    return response.data;
  } catch (error) {
    console.log("getCircleById error:", error.message);
    throw new Error("按照ID获取兴趣圈失败");
  }
};
export const deleteCircle = async (circleId) => {
  try {
    await axios.get(`${API_URL}/delete/${circleId}`);
    return { success: true }; // 删除成功时返回的响应
  } catch (error) {
    console.error("兴趣圈删除失败:", error);
    throw new Error("删除兴趣圈失败");
  }
};
