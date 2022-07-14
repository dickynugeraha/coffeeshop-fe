import { useContext, Fragment } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthContext from "./store/auth-context";

// User
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Auth from "./pages/Auth";
import Guide from "./pages/user/Guide";
// Admin
import Dashboard from "./pages/admin/Dashboard";
import Menu from "./pages/admin/Menu";
import Order from "./pages/admin/Order";
import NoMatch from "./components/UI/NoMatch";

const App = () => {
  const { isLoggedIn, userId, name, isAdmin } = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Fragment>
          <Switch>
            <Route path="/" exact>
              {isAdmin && <Redirect to="/dashboard" />}
              {!isAdmin && <Redirect to="/products" />}
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/guide">
              <Guide />
            </Route>
            <Route path="/login">
              {isLoggedIn && <Redirect to="/" />}
              {!isLoggedIn && <Auth />}
            </Route>
          </Switch>
        </Fragment>
        {/* User */}
        {!isAdmin && (
          <Fragment>
            <Switch>
              <Route path="/cart">
                {!isLoggedIn && <Redirect to="/login" />}
                {isLoggedIn && !isAdmin && <Cart userId={userId} />}
              </Route>
              <Route path="/checkout">
                {!isLoggedIn && <Redirect to="/login" />}
                {isLoggedIn && !isAdmin && (
                  <Checkout userId={userId} name={name} />
                )}
              </Route>
              <Route path={["/menu", "/orders/:status"]} component={NoMatch} />
            </Switch>
          </Fragment>
        )}
        {/* Admin */}
        {isAdmin && (
          <Fragment>
            <Switch>
              {/* <Route path="/users">
                {!isLoggedIn && <Redirect to="/login" />}
                <Users />
              </Route> */}
              <Route path="/dashboard">
                {!isLoggedIn && <Redirect to="/login" />}
                <Dashboard />
              </Route>
              <Route path="/menu">
                {!isLoggedIn && <Redirect to="/login" />}
                <Menu />
              </Route>
              <Route path="/orders/:status">
                {!isLoggedIn && <Redirect to="/login" />}
                <Order />
              </Route>
              <Route path={["/cart", "/checkout"]} component={NoMatch} />
            </Switch>
          </Fragment>
        )}
      </Layout>
    </div>
  );
};

export default App;
