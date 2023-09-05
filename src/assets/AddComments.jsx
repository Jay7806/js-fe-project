import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddComment = ({ setComments }) => {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      <label htmlFor="newComment">Add your comment here</label>
      <textarea
        id="newComment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      ></textarea>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddComment;
