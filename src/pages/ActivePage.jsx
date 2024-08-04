import React, { useState, useEffect } from "react";
import { fetchUsers } from "../api/user";
import Bar from "../components/Bar";
import "../css/ActivePage.css";

// 活跃度档次配置
const activityLevels = [
  { name: "机关枪", color: "red" },
  { name: "话痨", color: "orange" },
  { name: "活跃", color: "green" },
  { name: "冷漠", color: "blue" },
  { name: "尸体", color: "gray" },
];

const sortModes = [
  { key: "id", label: "按照用户ID排序" },
  { key: "username", label: "按照用户名排序" },
  { key: "activityLevel", label: "活跃度排序" },
];

const sortDirections = [
  { key: "asc", label: "升序" },
  { key: "desc", label: "降序" },
];

const ActivePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sortMode, setSortMode] = useState(sortModes[0].key); // 默认排序模式
  const [sortDirection, setSortDirection] = useState(sortDirections[0].key); // 默认排序方向

  const curUserID = localStorage.getItem("id");
  const curUsername = localStorage.getItem("username");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();

        // 计算活跃度档次
        const sortedUsers = [...userData].sort((a, b) => {
          if (sortDirection === "asc") {
            return a[sortMode] > b[sortMode] ? 1 : -1;
          } else {
            return a[sortMode] < b[sortMode] ? 1 : -1;
          }
        });

        const totalUsers = sortedUsers.length;
        const sectionSize = Math.ceil(totalUsers / 5);

        const usersWithActivityLevels = sortedUsers.map((user, index) => {
          const section = Math.floor(index / sectionSize);
          return {
            ...user,
            activityLevelLabel: activityLevels[section].name,
            activityLevelColor: activityLevels[section].color,
          };
        });

        setUsers(usersWithActivityLevels);
      } catch (err) {
        setError("无法获取用户数据");
      }
    };

    getUsers();
  }, [sortMode, sortDirection]);

  const handleSortChange = () => {
    const nextModeIndex =
      (sortModes.findIndex((mode) => mode.key === sortMode) + 1) %
      sortModes.length;
    const nextMode = sortModes[nextModeIndex].key;
    const nextDirection = sortDirection === "asc" ? "desc" : "asc";

    setSortMode(nextMode);
    setSortDirection(nextDirection);
  };

  return (
    <div className="AP-container">
      {/* 任务栏 */}
      <Bar userId={curUserID} username={curUsername} />

      {/* 主内容区域 */}
      <div className="AP-content">
        <button className="AP-sort-button" onClick={handleSortChange}>
          {sortModes.find((mode) => mode.key === sortMode).label} (
          {sortDirection === "asc" ? "升序" : "降序"})
        </button>
        <div className="AP-table-container">
          {error ? (
            <p>{error}</p>
          ) : (
            <table className="AP-table">
              <thead>
                <tr>
                  <th>用户ID</th>
                  <th>用户名</th>
                  <th>活跃度</th>
                  <th>活跃情况</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.activity}</td>
                    <td style={{ color: user.activityLevelColor }}>
                      {user.activityLevelLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 提示信息 */}
        <div className="AP-hint">
          <p>
            Hint: 创建兴趣圈、查看兴趣圈、发帖、评论都可以增加活跃度哦！
            <br />
            活跃情况排序:机关枪 {">"} 话痨 {">"} 活跃 {">"} 冷漠 {">"} 尸体
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivePage;
