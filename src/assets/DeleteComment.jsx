import React from "react";
import axios from "axios";
import "./CSS/Comments.css";

const CommentActions = ({ comment_id, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`https://js-be-project.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        onDelete(comment_id);
      })
      .catch((err) => {
        console.log("Error deleting comment", err);
      });
  };

  return (
    <div className="comment-actions" key={comment_id}>
      <button className="menu__button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default CommentActions;
