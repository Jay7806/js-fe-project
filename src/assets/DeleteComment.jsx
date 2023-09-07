import React from "react";
import axios from "axios";

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
    <div className="comment-actions">
      <button className="comment-action" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default CommentActions;
