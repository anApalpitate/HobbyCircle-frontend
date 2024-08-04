// src/components/CircleList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/default.png";

import { deleteCircle } from "../api/circle";
import { getImageData } from "../api/image";
import { addActivity } from "../api/user";
import "../css/HomePage.css";

const CircleList = ({ circles }) => {
  const [imageData, setImageData] = useState({});
  const navigate = useNavigate();
  const userID = localStorage.getItem("id");
  useEffect(() => {
    async function fetchImages() {
      const imageMap = {};
      for (const circle of circles) {
        const imageID = circle.cover.id;
        try {
          const response = await getImageData(imageID);
          imageMap[imageID] = Base64ToImageURL(response.data);
        } catch (error) {
          console.error(error);
          imageMap[imageID] = defaultImage;
        }
      }
      setImageData(imageMap);
    }

    fetchImages();
  }, [circles]);

  const handleEnterCircle = (circleId) => {
    addActivity(userID, 1);
    navigate(`/circle/${circleId}`);
  };

  const handleDeleteCircle = async (circleId) => {
    try {
      await deleteCircle(circleId);
      window.location.reload(); // 刷新页面
    } catch (error) {
      console.error("删除失败:", error);
    }
  };

  function Base64ToImageURL(base64String) {
    const dataURL = `data:image/png;base64,${base64String}`;
    return dataURL;
  }

  return (
    <div className="HP-Container">
      {circles.length === 0 ? (
        <p className="HP-emptyMessage">兴趣圈为空</p>
      ) : (
        circles.map((circle) => (
          <div key={circle.id} className="HP-circleItem">
            <img
              src={imageData[circle.cover.id] || defaultImage}
              alt={circle.cover.data ? circle.cover.fileName : "default"}
              className="HP-circleCover"
            />
            <div className="HP-circleDetails">
              <h2>{circle.name}</h2>
              <p>{circle.description}</p>
              <p className="HP-circleCreator">
                创建者: {circle.creator.username}
              </p>
              <p className="HP-circleCreationDate">
                创建时间: {new Date(circle.foundTime).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleEnterCircle(circle.id)}
              className="HP-enterCircleBtn"
            >
              进入
            </button>
            {(circle.creator.id == userID || userID == 1) && (
              <button
                onClick={() => handleDeleteCircle(circle.id)}
                className="HP-deleteCircleBtn"
              >
                删除
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CircleList;
