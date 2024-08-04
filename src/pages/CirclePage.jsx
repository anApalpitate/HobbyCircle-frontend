// src/pages/CirclePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCircleById } from "../api/circle";
import "../css/CirclePage.css";
import { getPostsByCircleId } from "../api/post";

import Bar from "../components/Bar";
import PostItem from "../components/post";
const CirclePage = () => {
  const userID = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const { circleId } = useParams();
  const [circle, setCircle] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCircleData = async () => {
      try {
        const fetchedCircle = await getCircleById(circleId);
        setCircle(fetchedCircle);
        const fetchedPosts = await getPostsByCircleId(circleId);
        setPosts(fetchedPosts);
      } catch (err) {
        setError("加载帖子数据失败");
      }
    };

    fetchCircleData();
  }, [circleId]);
  const handleCreatePost = () => {
    navigate(`/circle/${circleId}/createPost`);
  };
  const handlePostDeleted = async (postId) => {
    try {
      // 重新获取帖子数据
      const fetchedPosts = await getPostsByCircleId(circleId);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("删除帖子失败:", error);
      alert("删除帖子失败，请稍后再试。");
    }
  };
  return (
    <div className="CP-Container">
      <Bar userId={userID} username={username} />
      <div className="CP-MainContent">
        {circle && (
          <h1 className="CP-CircleTitle">所在兴趣圈: {circle.name}</h1>
        )}
        <button className="CP-PostButton" onClick={handleCreatePost}>
          发帖
        </button>
        {error && <p className="CP-error">{error}</p>}
        <div className="CP-SeparatorContainer"></div>

        <div>
          {posts.length === 0 ? (
            <p className="CP-NoPostsMessage">该兴趣圈还没有帖子</p>
          ) : (
            posts.map((post) => (
              <PostItem
                post={post}
                key={post.id}
                currentUserId={userID}
                OnDelete={handlePostDeleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CirclePage;
