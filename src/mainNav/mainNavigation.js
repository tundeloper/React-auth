import classes from "./mainNavigation.module.css";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const MainNav = (props) => {
  const { isLogedIn } = useContext(AuthContext);

  return (
    <div>
      <nav className={classes.nav}>
        <h1>sign up to get sarted</h1>
        <div>
          <ul className={classes.ul}>
            {!isLogedIn && (
              <li>
                <NavLink to="/">Login</NavLink>
              </li>
            )}

            {isLogedIn && (
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )}
            {isLogedIn && (
              <li className={classes.logout}>
                <NavLink to="/">Logout</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <section>{props.children}</section>
    </div>
  );
};

export default MainNav;
