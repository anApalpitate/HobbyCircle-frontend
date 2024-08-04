// src/components/Bar.jsx
import React, { useEffect, useState } from "react";
import { fetchInfs } from "../api/inf";
import "../css/HomePage.css";

const Bar = ({ userId, username }) => {
  function formatUserId(userId) {
    return userId.toString().padStart(8, "0");
  }
  const [infCnt, serInfCnt] = useState(0);
  useEffect(() => {
    const LoadInf = async () => {
      try {
        const infs = await fetchInfs(userId);
        serInfCnt(infs.length);
      } catch (error) {
        console.error("加载通知数目失败:", error);
      }
    };

    LoadInf();
  }, [userId]);
  return (
    <div className="HP-nav">
      <p className="Bar-title">兴趣圈 by lc</p>
      <ul className="HP-navlist">
        <li>
          <a href="/home">首页</a>
        </li>

        <li>
          <a href="/activity">活跃情况</a>
        </li>
        <li>
          <a href="/inf">查看通知</a>
        </li>
        {infCnt > 0 && <span className="Bar-inf-cnt">{infCnt}</span>}

        <li>
          <a href="/login">返回登录</a>
        </li>
      </ul>
      <div className="Bar-right-container">
        <span className="Bar-font">用户名：</span>
        <span className="Bar-username">{username}</span>
        <br />
        <span className="Bar-font">ID:@</span>
        <span className="Bar-userId">{formatUserId(userId)}</span>
      </div>
    </div>
  );
};

export default Bar;
