import "./assets/CSS/Navbar.css";
import { Route, Routes } from "react-router-dom";
import Header from "./assets/Header";
import Navbar from "./assets/Navbar";
import Articles from "./assets/Articles";
import Home from "./assets/Home";
import SingleArticle from "./assets/SingleArticle";
import GetUsers from "./assets/Users";
import SingleUser from "./assets/SignInPage";

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
          <Route path="/user" element={<SingleUser />} /> 
        </Routes>
      </div>
  );
}

export default App;
