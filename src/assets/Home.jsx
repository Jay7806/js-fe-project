import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
    return (
      <div>
        <h1>Welcome to our news page!</h1>
        <h2>
          Here you can read news articles about subjects like Coding, Cooking
          and Football.
        </h2>
      </div>
    );

}

export default Home;