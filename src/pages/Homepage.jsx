// src/pages/Homepage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCircles } from "../api/circle";

import Bar from "../components/Bar";
import CircleList from "../components/CircleList";

import "../css/HomePage.css";

const HomePage = () => {
  const [circles, setCircles] = useState([]);
  const [Displayed, setDisplayed] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 用于搜索框的状态
  const [isFilteringMine, setIsFilteringMine] = useState(false); // 用于筛选功能的状态
  const [sortMode, setSortMode] = useState(0); // 0: 默认排序 1: 按创建者排序, 2: 按创建时间排序

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const circles = await getCircles();
        if (!circles) return;
        setCircles(circles);
        setDisplayed(circles);
      } catch (error) {
        setError("加载兴趣圈失败");
      }
    };

    fetchCircles();
  }, []);

  useEffect(() => {
    const updatedCircles = circles.filter((circle) =>
      circle.name.includes(searchTerm)
    );

    const FilteredCircles = isFilteringMine
      ? updatedCircles.filter((circle) => circle.creator.id == userId)
      : updatedCircles;
    const sortedCircles = [...FilteredCircles].sort((a, b) => {
      switch (sortMode) {
        case 0: // 按创建时间排序
          return new Date(a.foundTime) - new Date(b.foundTime);
        case 1: // 按创建者名称排序
          return a.creator.username.localeCompare(b.creator.username);
        case 2: // 按兴趣圈名称排序
          return a.name.localeCompare(b.name);
        case 3: // 按ID排序
          return a.id - b.id;
        default:
          return a.id - b.id;
      }
    });
    setDisplayed(sortedCircles);
  }, [circles, searchTerm, isFilteringMine, sortMode, userId]);

  const handleCreateCircle = () => {
    navigate("/createCircle");
  };

  const handleSelectMine = () => {
    setIsFilteringMine((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = () => {
    setSortMode((prev) => (prev + 1) % 4);
  };

  return (
    <div className="HP-Container">
      <Bar userId={userId} username={localStorage.getItem("username")} />
      <ul className="HP-li_horizontal">
        <li>
          <button onClick={handleCreateCircle} className="HP-Button">
            创建我的兴趣圈
          </button>
        </li>
        <li>
          <button onClick={handleSelectMine} className="HP-Button">
            {isFilteringMine ? "显示所有兴趣圈" : "筛选我创建的兴趣圈"}
          </button>
        </li>

        <li>
          <button onClick={handleSort} className="HP-Button">
            {sortMode === 0 && "切换为按创建时间排序"}
            {sortMode === 1 && "切换为按创建者名称排序"}
            {sortMode === 2 && "切换为按兴趣圈名称排序"}
            {sortMode === 3 && "切换为按兴趣圈ID排序"}
          </button>
        </li>

        <li>
          <input
            type="text"
            placeholder="搜索兴趣圈..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="HP-search-box"
          />
        </li>
      </ul>
      <div className="HP-homeContainer">
        {error ? (
          <p className="HP-errorMessage">{error}</p>
        ) : (
          <CircleList circles={Displayed} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
