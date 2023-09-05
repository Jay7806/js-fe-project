import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/Comments.css";
import AddComment from "./AddComments";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = () => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(
        `https://js-be-project.onrender.com/api/articles/${article_id}/comments`
      )
      .then((apiResponse) => {
        setComments(apiResponse.data.comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [article_id]);

  const addComment = (newComment) => {
    axios
      .post(
        `https://js-be-project.onrender.com/api/articles/${article_id}/comments`,
        { body: newComment, author: 'jessjelly' }
      )
      .catch(() => {
        setIsError(true);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => {
          return (
            <li className="comments" key={comment.comment_id}>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
      <AddComment addComment={addComment} />
    </div>
  );
}
