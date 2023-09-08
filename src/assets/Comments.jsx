import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/Comments.css";
import AddComment from "./AddComments";
import CommentActions from "./DeleteComment";
import UrlBase from "./UrlBase";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`${UrlBase}articles/${article_id}/comments`)
      .then((apiResponse) => {
        setComments(apiResponse.data.comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleCommentDelete = (comment_id) => {
    const updatedComments = comments.filter(
      (comment) => comment.comment_id !== comment_id
    );
    setComments(updatedComments);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

    return (
    <div className="commentsContainer" key={comments.created_at}>
      <h1 className="commentsHeader">Comments</h1>
      {comments.map((comment) => {
        let date = comment.created_at.slice(0, 10)
        let time = comment.created_at.slice(11, 16);
        return (
          <div key={comment.comment_id}>
            <ul className="comments">
              <p>{comment.body}</p>
              <p>Author: {comment.author}</p>
              <span className="time-left">
                {date} {time}
              </span>
              <div className="comment-actions">
                <CommentActions
                  comment_id={comment.comment_id}
                  onDelete={handleCommentDelete}
                />
              </div>
            </ul>
            <br></br>
          </div>
        );
      })}
      <AddComment setComments={setComments} />
    </div>
  );
}
