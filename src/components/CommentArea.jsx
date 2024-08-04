import React, { useState, useEffect } from "react";
import { fetchComments, createComment, deleteComment } from "../api/comment";
import "../css/post.css";

const CommentArea = ({ postId, userID }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("加载评论失败:", error);
      }
    };

    loadComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    if (newComment.length > 100) {
      alert("评论不能超过100个字");
      return;
    }

    try {
      await createComment(newComment, postId, userID);
      setNewComment("");
      const updatedComments = await fetchComments(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error("提交评论失败:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("删除评论失败:", error);
    }
  };

  return (
    <div className="P-CommentArea">
      <p className="P-CommentArea-Title">评论区</p>
      <ul className="P-CommentsList">
        {comments.length === 0 ? (
          <p className="P-NoComment">暂无评论，快来抢沙发吧!</p>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="P-CommentItem">
              <span className="P-CommentAuthor">
                {comment.author.username}:
              </span>
              <div className="P-CommentContent">{comment.content}</div>
              {(comment.author.id == userID || userID == 1) && (
                <button
                  className="P-DeleteButton"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  删除
                </button>
              )}
            </li>
          ))
        )}
      </ul>
      <textarea
        className="P-CommentInput"
        value={newComment}
        onChange={handleCommentChange}
        rows="3"
        placeholder="靓仔，速速来写下你的评论...(100字以内)"
        maxLength={100} // 限制输入长度
      />
      <button className="P-CommentButton" onClick={handleCommentSubmit}>
        提交评论
      </button>
    </div>
  );
};

export default CommentArea;
