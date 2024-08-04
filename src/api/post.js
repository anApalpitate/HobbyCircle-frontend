// src/api/post.js

import axios from "axios";

const API_URL = "http://localhost:7001/post";

export const createPost = async (title, content, userID, CircleID, images) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userID", userID);
    formData.append("CircleID", CircleID);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("createPost data:", response.data);
    return response.data;
  } catch (error) {
    console.error("createPost error:", error.message);
    throw new Error(`兴趣帖创建失败: ${error.message}`);
  }
};

export const getPostsByCircleId = async (CircleID) => {
  try {
    const response = await axios.get(
      `${API_URL}/getPostsByCircleId/${CircleID}`
    );
    return response.data.data;
  } catch (error) {
    console.error("getPostByCircleID error:", error.message);
    throw new Error("按照兴趣圈ID获取帖子失败");
  }
};

export const getPostById = async (postID) => {
  try {
    const response = await axios.get(`${API_URL}/getByID/${postID}`);
    return response.data;
  } catch (error) {
    console.error("getPostById error:", error.message);
    throw new Error("按照ID获取帖子失败");
  }
};

export const deletePost = async (postID) => {
  try {
    await axios.get(`${API_URL}/delete/${postID}`);
    return { success: true }; // 删除成功时返回的响应
  } catch (error) {
    console.error("帖子删除失败:", error);
    throw new Error("删除帖子失败");
  }
};
