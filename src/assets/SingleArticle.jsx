import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/SingleArticle.css";
import Comments from "./Comments";
import UrlBase from "./UrlBase";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`${UrlBase}articles/${article_id}`)
      .then((apiResponse) => {
        const articleData = apiResponse.data.articles[0];
        setArticle(articleData);
        setVotes(articleData.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = () => {
    if (!voted) {
      setVotes((currentVotes) => currentVotes + 1);
      setVoted(true);
      axios
        .patch(`${UrlBase}articles/${article_id}`, { inc_votes: 1 })
        .catch((err) => {
          setVotes((currentVotes) => currentVotes - 1);
          console.log(err);
          setVoted(false);
        });
    } else {
      setVotes((currentVotes) => currentVotes - 1);
      setVoted(false);
      axios
        .patch(`${UrlBase}articles/${article_id}`, { inc_votes: -1 })
        .catch((err) => {
          setVotes((currentVotes) => currentVotes + 1);
          console.log(err);
          setVoted(true);
        });
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      <h2 className="Header">{article.title}</h2>
      <p className="subHeader">Article Topic: {article.topic}</p>
      <img className="image" src={article.article_img_url} />
      <p>{article.body}</p>
      <div className="extraInfo">
        <p>Author: {article.author}</p>
        <button className="vote-button" onClick={handleVote}>
          Votes {votes}
        </button>
      </div>
      <Comments />
    </>
  );
}
