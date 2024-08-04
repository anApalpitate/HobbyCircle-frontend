// src/api/image.js

const API_URL = "http://localhost:7001/image";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.statusText}`);
    }

    const data = await response.json(); // 解析 JSON 数据
    if (data && data.length == 1) {
      return data[0];
    } else if (data && data.length > 1) {
      return data;
    } else {
      throw new Error("未返回图片 ID");
    }
  } catch (error) {
    throw new Error(`图片上传失败: ${error.message}`);
  }
};
export const getImageData = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data) {
      return data;
    } else {
      throw new Error("未返回图片数据");
    }
  } catch (error) {
    throw new Error(`获取图片数据失败: ${error.message}`);
  }
};
