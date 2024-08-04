import React, { useState, useEffect } from "react";
import { fetchInfs, deleteInf, clearAllInf } from "../api/inf";
import Bar from "../components/Bar";
import "../css/InfPage.css";

const InfPage = () => {
  const [infs, setInfs] = useState([]);
  const userID = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  useEffect(() => {
    const loadInfs = async () => {
      try {
        const fetchedInfs = await fetchInfs(userID);
        setInfs(fetchedInfs);
      } catch (error) {
        console.error("加载通知失败:", error);
      }
    };

    loadInfs();
  }, []);

  const handleDelete = async (infID) => {
    try {
      await deleteInf(infID);
      const updatedInfs = infs.filter((inf) => inf.id !== infID);
      setInfs(updatedInfs);
    } catch (error) {
      console.error("删除通知失败:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllInf(userID);
      setInfs([]);
    } catch (error) {
      console.error("清空通知失败:", error);
    }
  };

  return (
    <div className="IP-Page">
      <Bar userId={userID} username={username} />
      <div className="IP-Container">
        <h1 className="IP-Title">通知</h1>
        <button className="IP-ClearAllButton" onClick={handleClearAll}>
          清空所有通知
        </button>
        <ul className="IP-List">
          {infs.length === 0 ? (
            <p className="IP-NoNotifications">没有通知</p>
          ) : (
            infs.map((inf) => (
              <li key={inf.id} className="IP-Item">
                <div className="IP-Content">{inf.content}</div>
                <button
                  className="IP-DeleteButton"
                  onClick={() => handleDelete(inf.id)}
                >
                  删除
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default InfPage;
