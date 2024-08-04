// src/api/comment.js
import axios from "axios";

const API_URL = "http://localhost:7001/comment"; // 硬编码后端端口

export const fetchComments = async (postID) => {
  try {
    const response = await axios.get(`${API_URL}/fetchComments/${postID}`);
    return response.data;
  } catch (error) {
    console.log("fetchComments error:", error.message);
    throw new Error("获取评论列表失败");
  }
};

export const createComment = async (content, postID, authorID) => {
  try {
    const data = { content, postID, authorID };
    await axios.post(`${API_URL}/create`, data);
    return;
  } catch (error) {
    console.error("评论发布错误:", error);
    throw new Error("创建评论失败");
  }
};
export const deleteComment = async (commentID) => {
  try {
    const response = await axios.get(`${API_URL}/delete/${commentID}`);
    return;
  } catch (error) {
    console.error("删除评论错误:", error);
    throw new Error("删除评论失败");
  }
};
