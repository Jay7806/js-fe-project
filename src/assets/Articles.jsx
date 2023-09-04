import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = uesState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);
    axios
      .get(`https://js-be-project.onrender.com/api/articles`)
      .then((apiResponse) => {
        console.log(apiResponse);
        setArticles(apiResponse);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      {articles.map((article) => {
        return (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
            <div>
              <p>{article.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
