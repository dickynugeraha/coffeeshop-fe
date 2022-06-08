import { useContext, Fragment } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
// User
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Auth from "./pages/Auth";
// Admin
import Dashboard from "./pages/admin/Dashboard";
import Menu from "./pages/admin/Menu";
import Order from "./pages/admin/Order";
import NoMatch from "./components/UI/NoMatch";

import AuthContext from "./store/auth-context";

const App = () => {
  const { isLoggedIn, userId, isAdmin, permOrder, denyOrder, confirmOrder } =
    useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Fragment>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/products" />
            </Route>
            <Route path="/products" exact>
              <Products />
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
                {isLoggedIn && !isAdmin && (
                  <Cart
                    userId={userId}
                    permOrder={permOrder}
                    denyOrder={denyOrder}
                    confirmOrder={confirmOrder}
                  />
                )}
              </Route>
              <Route path="/checkout">
                {!isLoggedIn && <Redirect to="/login" />}
                {isLoggedIn && !isAdmin && <Checkout userId={userId} />}
              </Route>
            </Switch>
          </Fragment>
        )}
        {/* Admin */}
        {isAdmin && (
          <Fragment>
            <Switch>
              <Route path="/dashboard">
                {!isLoggedIn && <Redirect to="/login" />}
                <Dashboard />
              </Route>
              <Route path="/menu">
                {!isLoggedIn && <Redirect to="/login" />}
                <Menu />
              </Route>
              <Route path="/orders">
                {!isLoggedIn && <Redirect to="/login" />}
                <Order />
              </Route>
              {/* <Route path="*" component={NoMatch} /> */}
            </Switch>
          </Fragment>
        )}
      </Layout>
    </div>
  );
};

export default App;
