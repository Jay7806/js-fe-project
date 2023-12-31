import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { sortArrayByField } from "./SortBy";
import "./CSS/Articles.css";
import UrlBase from "./UrlBase";

export default function Articles() {
  const { topics } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);

    if (topics) {
      axios
        .get(`${UrlBase}articles?topic=${topics}`)
        .then((apiResponse) => {
          setArticles(apiResponse.data.article);
          setIsLoading(false);
        });
    } else {
      axios
        .get(`${UrlBase}articles`)
        .then((apiResponse) => {
          setArticles(apiResponse.data.article);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrMsg(error.msg);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, []);

  const handleSort = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("asc");
    }
  };

  let sortedArticles = [...articles];
  sortedArticles = sortArrayByField(
    sortedArticles,
    sortBy === "date" ? "created_at" : sortBy,
    sortOrder
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong: ${errMsg}</p>;

  return (
    <div>
      <div className="sorting">
        <div className="sortBy">
          <label>Sort By:</label>
          <select onChange={(e) => handleSort(e.target.value)} value={sortBy}>
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="sortOrder">
          <label>Sort Order:</label>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <h3>Choose an article to read more</h3>
      <div className="articlesContainer">
        {sortedArticles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <div className="article" key={article.article_id}>
                <div className="articleTitle">{article.title}</div>
                <img
                  className="image"
                  src={article.article_img_url}
                  alt={article.title}
                />
              </div>
            </Link>
          );
        })}
      </div>
      //{" "}
    </div>
  );
}
