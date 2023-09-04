import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CSS/Articles.css"

export default function Articles() {
  const [Articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);
    axios
      .get(`https://js-be-project.onrender.com/api/articles`)
      .then((apiResponse) => {
        console.log(apiResponse.data.article);
        setArticles(apiResponse.data.article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  if (Articles !== undefined) {
    return (
      <div className="articlesContainer">
        {Articles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <div className="article" key={article.article_id}>
                <p>{article.title}</p>
                <img className="image" src={article.article_img_url} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
