import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
import { useContext } from "react";
import { UserContext } from "./User";

const Navbar = () => {
  const {user} = useContext(UserContext)
  return (
    <nav>
      <ul>
        <li>
          <Link className="Home" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li style={{ float: "right" }}>
          <Link className="active" to="/users">
            Users
          </Link>
        </li>
        <li style={{ float: "right" }}>
          <a href="user" className="user">Signed in: {user}</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
