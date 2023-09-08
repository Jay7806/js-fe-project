import React, { useState } from "react";
import axios from "axios";
import "./CSS/Comments.css";
import UrlBase from "./UrlBase";
import { useContext } from "react";
import { UserContext } from "./User";

const CommentActions = ({ comment_id, author, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);

  const handleDelete = () => {
    if (confirmDelete) {
      if (author === user) {
        axios
          .delete(`${UrlBase}comments/${comment_id}`)
          .then(() => {
            onDelete(comment_id);
          })
          .catch((err) => {
            console.log("Error deleting comment", err);
            setIsError(true);
            setErrMsg(err);
          });
      } else {
        setIsError(true);
        setErrMsg("Only the author can delete this comment.");
      }
    } else {
      setConfirmDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setIsError(false)
  };

  if (isError) return <p>{`${errMsg}`}</p>;

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
