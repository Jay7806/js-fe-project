import "./CSS/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./CSS/Header.css";
import UrlBase from "./UrlBase";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);
    axios
      .get(`${UrlBase}topics`)
      .then((apiResponse) => {
        setTopics(apiResponse.data.topics);
        setIsLoading(false);
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
      <h1 className="headerHome">Welcome to our news page!</h1>
      <br></br>
      <h2 className="subHeader">
        Here on our site, you can read news articles about subjects like Coding,
        Cooking and Football.
      </h2>
      <br></br>
      <h3 className="header3">Quick links to topics below</h3>
      <div>
        <div className="topicsContainer">
          {topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`/topics/${topic.slug}`}>
                <button className="button type1">
                  <span className="btn-txt">{topic.slug}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
