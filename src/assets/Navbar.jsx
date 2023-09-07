import { Link } from "react-router-dom";
import "./CSS/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a className="Home" href="/home">Home</a>
        </li>
        <li>
          <a href="/articles">Articles</a>
        </li>
        <li>
          <a href="/authors">Authors</a>
        </li>
        <li style={{ float: "right" }}>
          <a className="active" href="/users">
            Users
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
