// src/components/post.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getImageData } from "../api/image";
import { deletePost } from "../api/post";

import "../css/post.css";
import CommentArea from "./CommentArea";

const PostItem = ({ post, currentUserId, OnDelete }) => {
  const [imageURLs, setImageURLs] = useState([]);
  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const urls = await Promise.all(
          post.images.map(async (image) => {
            const response = await getImageData(image.id);
            return `data:image/png;base64,${response.data}`;
          })
        );
        setImageURLs(urls);
      } catch (error) {
        console.error(error);
      }
    };

    if (post.images.length > 0) {
      fetchImageURLs();
    }
  }, [post.images]);

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id); // 调用删除 API
      OnDelete(post.id); // 调用父组件传递的方法
    } catch (error) {
      console.error("删除帖子失败:", error);
      alert("删除帖子失败，请稍后再试。");
    }
  };
  function formatUserId(userId) {
    return userId.toString().padStart(8, "0");
  }
  return (
    <div className="P-Post">
      <h1 className="P-PostTitle">{post.title}</h1>
      <div className="P-PostAuthor">
        <strong style={{ color: "black" }}>作者:</strong> {post.author.username}
        <strong style={{ color: "black" }}>
          @{formatUserId(post.author.id)}
        </strong>{" "}
      </div>
      <div className="P-PostContent">{post.content}</div>
      <div className="P-PostTimestamp">
        <strong style={{ color: "black" }}>发布时间:</strong>{" "}
        {new Date(post.createdAt).toLocaleString()}
      </div>

      {imageURLs.length > 0 && (
        <div className="P-PostImages">
          {imageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Post image ${index}`}
              className="P-PostImage"
            />
          ))}
        </div>
      )}

      {(post.author.id == currentUserId || currentUserId == 1) && (
        <button className="P-PostDeleteButton" onClick={handleDeletePost}>
          删除帖子
        </button>
      )}
      <CommentArea postId={post.id} userID={currentUserId} />
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PostItem;
