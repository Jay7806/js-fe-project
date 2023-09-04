import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/SingleArticle.css"

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`https://js-be-project.onrender.com/api/articles/${article_id}`)
      .then((apiResponse) => {
        setArticle(apiResponse.data.articles[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;


  if (article !== undefined) {
  return (
    <div>
      <h2 className="Header">{article.title}</h2>
      <p>Article Topic: {article.topic}</p>
      <img className="image" src={article.article_img_url} />
      <p>{article.body}</p>
      <div className="extraInfo">
        <p>Author: {article.author}</p>
        <p>Votes {article.votes}</p>
      </div>
    </div>
  );
}
}
