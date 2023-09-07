import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/Users.css";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);

    axios
      .get(`https://js-be-project.onrender.com/api/users`)
      .then((apiResponse) => {
        setUsers(apiResponse.data.users);
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
    <div className="usersContainer" key={users.username}>
      {users.map((user) => {
        return (
          <div className="users" key={user.username}>
            <img className="userImg" src={user.avatar_url} />
            <div>Username: {user.username}</div>
            <div>Name: {user.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GetUsers;
