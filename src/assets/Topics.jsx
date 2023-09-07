import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CSS/Topics.css";

const Topics = () => {
  const [selectTopics, setSelectTopics] = useState([]);
  const { topics } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`https://js-be-project.onrender.com/api/articles?topics=${topics}`)
      .then((response) => {
        console.log(response.data.article);
        setSelectTopics(response.data.article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topics]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  console.log(topics);
  return (
    <div className="topicsContainer">
      {selectTopics.map((topics) => {
        return (
          <div className="topics" key={topics.article_id}>
            <p className="topicTitle">{topics.title}</p>
            <img src={topics.article_img_url} />
          </div>
        );
      })}
    </div>
  );
};

export default Topics;
