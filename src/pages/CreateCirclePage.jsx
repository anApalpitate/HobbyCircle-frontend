// src/pages/CreateCirclePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCircle } from "../api/circle";
import { uploadImage } from "../api/image";
import "../css/CreateCirclePage.css";

import Bar from "../components/Bar";

const CreateCirclePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (name.length > 20) {
      setErrorMessage("兴趣圈名称不能超过20个字");
      return;
    }
    if (description.length > 100) {
      setErrorMessage("兴趣圈描述不能超过100个字");
      return;
    }

    try {
      // 上传图片并获得图片ID
      let imageID = 0;
      if (coverImage) {
        imageID = await uploadImage(coverImage);
      }

      // 发送创建兴趣圈请求
      if (imageID <= 0) {
        throw new Error("上传图片失败，请重试");
      }
      const userId = localStorage.getItem("id");
      await createCircle(name, description, imageID, userId, Date());
      setSuccessMessage("兴趣圈创建成功！");
      setTimeout(() => navigate("/home"), 200);
    } catch (error) {
      setErrorMessage(error.message || "创建兴趣圈失败");
    }
  };

  return (
    <div className="Page">
      <Bar
        userId={localStorage.getItem("id")}
        username={localStorage.getItem("username")}
      />
      <div className="CCP-container">
        <h1 className="CCP-h1">创建兴趣圈</h1>
        <form onSubmit={handleSubmit} className="CCP-create-circle-form">
          <div className="CCP-form-group-container">
            <div className="CCP-form-group">
              <label className="CCP-label" htmlFor="name">
                兴趣圈名称:
              </label>
              <textarea
                className="CCP-name-area"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入兴趣圈名称(20字以内)"
                required
                maxLength={20} // 限制输入长度
              />
            </div>

            <div className="CCP-form-group">
              <label className="CCP-label" htmlFor="description">
                描述:
              </label>
              <textarea
                className="CCP-description-area"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请输入兴趣圈描述(100字以内)"
                maxLength={100} // 限制输入长度
              />
            </div>

            <div className="CCP-cover-image-group">
              <label className="CCP-label" htmlFor="cover">
                封面图片:
              </label>
              <input
                type="file"
                id="cover"
                accept="image/jpeg,image/png"
                onChange={(e) => handleImageChange(e)}
              />
              {coverImage && (
                <div className="CCP-image-preview-container">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="封面预览"
                    className="CCP-image-preview"
                  />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="CCP-submit-button">
            创建兴趣圈
          </button>
          <button
            type="button"
            className="CCP-back-button"
            onClick={() => navigate("/home")}
          >
            返回
          </button>
          {errorMessage && <p className="CCP-error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="CCP-success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateCirclePage;
