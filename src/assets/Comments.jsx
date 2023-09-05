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

  useEffect(() => {
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
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  return (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <ul className="comments">
              <p>{comment.body}</p>
            </ul>
            <br></br>
          </div>
        );
      })}
      <AddComment setComments={setComments} />
    </>
  );
}
