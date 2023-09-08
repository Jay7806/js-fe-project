import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./CSS/Users.css";
import UrlBase from "./UrlBase";
import { UserContext } from "./User";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);

    axios
      .get(`${UrlBase}users`)
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
      <h2 className="userHeader">Choose a user to sign in</h2>
      <br></br>
      {users.map((user) => {
        return (
          <div
            className="users"
            key={user.username}
            onClick={() => setUser(user.username)}
          >
            <button>
            <img
              className="userImg"
              src={user.avatar_url}
              alt={`Avatar for ${user.username}`}
            />
            
              <div>Username: {user.username}</div>
              <div>Name: {user.name}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GetUsers;
