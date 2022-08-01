import React, { useContext, Fragment, Suspense } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthContext from "./store/auth-context";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import WrapContent from "./components/UI/WrapContent";

import Products from "./pages/user/Products";
import Dashboard from "./pages/admin/Dashboard";

// User
const Cart = React.lazy(() => import("./pages/user/Cart"));
const Checkout = React.lazy(() => import("./pages/user/Checkout"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Guide = React.lazy(() => import("./pages/user/Guide"));

// Admin
const Menu = React.lazy(() => import("./pages/admin/Menu"));
const Order = React.lazy(() => import("./pages/admin/Order"));
const NoMatch = React.lazy(() => import("./components/UI/NoMatch"));

const App = () => {
  const { isLoggedIn, userId, name, isAdmin } = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Suspense
          fallback={
            <WrapContent>
              <div className="action" style={{ marginTop: "5rem" }}>
                <LoadingSpinner />
              </div>
            </WrapContent>
          }
        >
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
                <Route
                  path={["/menu", "/orders/:status"]}
                  component={NoMatch}
                />
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
        </Suspense>
      </Layout>
    </div>
  );
};

export default App;
