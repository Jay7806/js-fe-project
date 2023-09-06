import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./CSS/Articles.css";

export default function Articles() {
  const {topics} = useParams()
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    setIsLoading(false);
    setIsError(false);

if(topics){
   axios
        .get(`https://js-be-project.onrender.com/api/articles?topic=${topics}`)
     .then((apiResponse) => {
       setArticles(apiResponse.data.article);
       setIsLoading(false);
     });
} else{
    axios
      .get(`https://js-be-project.onrender.com/api/articles`)
      .then((apiResponse) => {
        setArticles(apiResponse.data.article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
<div>
      <div className="articlesContainer">
        {articles.map((article) => {
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
    </div>
  );
}
