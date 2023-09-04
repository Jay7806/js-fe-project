import { useState } from "react";
import "./assets/CSS/App.css";
import "./assets/CSS/Navbar.css"
import { Route, Routes } from "react-router-dom";
import Header from "./assets/Header";
import Navbar from "./assets/Navbar";
import Articles from "./assets/Articles";

function App() {
    return (
      <div>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/home" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </div>
    );

}

export default App;
