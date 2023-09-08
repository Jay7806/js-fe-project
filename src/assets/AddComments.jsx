import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/AddComment.css";
import UrlBase from "./UrlBase";

const AddComment = ({ setComments }) => {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newComment.length <= 5) {
      alert("Comment must be longer than 10 characters");
      return;
    }

    const commentToAdd = { body: newComment, author: "jessjelly" };
    setNewComment("");
    setComments((currentComments) => {
      return [...currentComments, commentToAdd];
    });
    axios
      .post(
        `https://js-be-project.onrender.com/api/articles/${article_id}/comments`,
        commentToAdd
      )
      .catch((err) => {
        console.log("Something went wrong", err);
        setIsError(true);
        setIsLoading(false);
        setComments(
          currentComments.filter((comment) => comment !== commentToAdd)
        );
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <form className="AddComment" onSubmit={handleSubmit}>
      <textarea
        id="newComment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      ></textarea>
      <div className="buttons">
        <button className="menu__button" type="submit">
          <span></span>
          <p
            data-start="New comment"
            data-text="Submit"
            data-title="Add comment"
          ></p>
        </button>
      </div>
    </form>
  );
};

export default AddComment;
