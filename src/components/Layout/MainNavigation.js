import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const { name, isLoggedIn, isAdmin, logout } = authContext;

  const history = useHistory();

  const logoutHandler = () => {
    logout();
    history.push("/");
  };

  let link = "/products";
  if (isAdmin) {
    link = "/dashboard";
  }

  return (
    <nav className={classes.navbar}>
      <Link to={`${link}`}>
        <h1 className={`${classes.logo} logo`}>Casper & Luna</h1>
      </Link>
      <ul className={classes["nav-items"]}>
        {isLoggedIn && (
          <Fragment>
            {isAdmin && (
              <Fragment>
                <li>
                  <Link to="/menu">
                    <p>Products</p>
                  </Link>
                </li>
                <li>
                  <Link to="/orders">
                    <p>Orders</p>
                  </Link>
                </li>
              </Fragment>
            )}
            {!isAdmin && (
              <li>
                <Link to="/cart">
                  <div className={classes["btn_cart"]}>Cart</div>
                </Link>
              </li>
            )}
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </Fragment>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <p>Login</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
