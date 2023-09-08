import "./assets/CSS/Navbar.css";
import { Route, Routes } from "react-router-dom";
import Header from "./assets/Header";
import Navbar from "./assets/Navbar";
import Articles from "./assets/Articles";
import Home from "./assets/Home";
import SingleArticle from "./assets/SingleArticle";
import GetUsers from "./assets/Users";

function App() {
  return (
      <div>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/topics/:topics" element={<Articles />} />
          <Route path="/users" element={<GetUsers />} />
        </Routes>
      </div>
  );
}

export default App;
