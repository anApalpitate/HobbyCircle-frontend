// src/pages/MakePostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCircleById } from "../api/circle";
import { createPost } from "../api/post";

import Bar from "../components/Bar";

import "../css/MakePostPage.css";

const MakePostPage = () => {
  const userID = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const { circleId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [circleName, setCircleName] = useState("无法获取兴趣圈名称");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCircleData = async () => {
      try {
        const circle = await getCircleById(circleId);
        setCircleName(circle.name); // 更新 state
      } catch (err) {
        setCircleName("获取兴趣圈名称失败");
        console.error(err);
      }
    };
    fetchCircleData();
  }, [circleId]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 16) {
      alert("最多只能选择16张图片");
      return;
    }
    setImages(files);
  };

  const handlePublish = async () => {
    if (!title || !text) {
      setError("标题和内容不能为空");
      return;
    }
    if (title.length > 20) {
      setError("标题不能超过20个字");
      return;
    }
    if (text.length > 200) {
      setError("内容不能超过200个字");
      return;
    }

    try {
      await createPost(title, text, userID, circleId, images);
      navigate(`/circle/${circleId}`); // 成功后导航到兴趣圈页面
    } catch (err) {
      setError("帖子发布失败，请稍后再试");
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate(`/circle/${circleId}`);
  };

  return (
    <div className="MPP-PageContainer">
      <Bar userId={userID} username={username} />
      <div className="MPP-Content">
        <div className="MPP-Title">创建兴趣帖</div>

        <div className="MPP-CircleName">当前兴趣圈: {circleName}</div>
        <input
          type="text"
          className="MPP-TitleInput"
          placeholder="标题(20字以内)"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          maxLength={20} // 限制输入长度
        />
        <textarea
          className="MPP-TextArea"
          placeholder="请输入内容(200字以内)"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
          maxLength={200} // 限制输入长度
        />
        <div className="MPP-hint">最多可以上传16张图片</div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="MPP-UploadButton"
        />
        <div className="MPP-ImagePreview">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
            />
          ))}
        </div>
        <button className="MPP-PublishButton" onClick={handlePublish}>
          发布
        </button>
        <button className="MPP-BackButton" onClick={handleBack}>
          返回兴趣圈
        </button>
        {error && <div className="MPP-Error">{error}</div>}
      </div>
    </div>
  );
};

export default MakePostPage;
