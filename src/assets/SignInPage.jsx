import { useContext } from "react";
import { UserContext } from "./User";
import React, { useState } from "react";



const SingleUser = () => {
  const { user } = useContext(UserContext);
  console.log(user.username);

    return (
      <div>
        <img
          className="userImg"
          src={user.avatar_url}
          alt={`Avatar for ${user.username}`}
        />
        <div>Username: {user.username}</div>
        <div>Name: {user.name}</div>
      </div>
    );
}

export default SingleUser;