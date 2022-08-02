import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, isAdmin, logout } = authContext;

  const history = useHistory();

  const logoutHandler = () => {
    logout();
    history.push("/");
  };

  let link = "/";
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
                {/* <li>
                  <Link to="/users">
                    <p>Users</p>
                  </Link>
                </li> */}
                <li>
                  <Link to="/menu">
                    <p>Menu</p>
                  </Link>
                </li>
                <li className={classes.order}>
                  <p>Orders</p>
                  <div className={classes["dropdown-content"]}>
                    <Link to="/orders/antrean">Antrean</Link>
                    <Link to="/orders/success">Success</Link>
                    <Link to="/orders/cancel">Cancel</Link>
                  </div>
                </li>
              </Fragment>
            )}

            {!isAdmin && (
              <Fragment>
                <li style={{ height: "40px" }}>
                  <Link to="/cart">
                    <div className={classes["btn_cart"]}>Cart</div>
                  </Link>
                </li>

                <li>
                  <Link to="/checkout">
                    <p>Order List</p>
                  </Link>
                </li>
              </Fragment>
            )}
            <Fragment>
              {!isAdmin && (
                <li>
                  <Link to="/guide">
                    <p>Guide</p>
                  </Link>
                </li>
              )}
            </Fragment>
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </Fragment>
        )}

        {!isLoggedIn && (
          <Fragment>
            {!isAdmin && (
              <li>
                <Link to="/guide">
                  <p>Guide</p>
                </Link>
              </li>
            )}
            <li>
              <Link to="/login">
                <p>Login</p>
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
