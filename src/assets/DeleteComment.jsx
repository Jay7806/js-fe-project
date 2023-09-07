import React, { useState } from "react";
import axios from "axios";
import "./CSS/Comments.css";
import UrlBase from "./UrlBase";

const CommentActions = ({ comment_id, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      axios
        .delete(`${UrlBase}comments/${comment_id}`)
        .then(() => {
          onDelete(comment_id);
        })
        .catch((err) => {
          console.log("Error deleting comment", err);
        });
    } else {
      setConfirmDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className="comment-actions" key={comment_id}>
      {confirmDelete ? (
        <>
          <p>Are you sure you want to delete this comment?</p>
          <button className="menu__button" onClick={handleDelete}>
            Yes
          </button>
          <button className="menu__button" onClick={handleCancelDelete}>
            No
          </button>
        </>
      ) : (
        <button className="menu__button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentActions;
