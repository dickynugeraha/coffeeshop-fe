import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { domainUrl } from "../../lib/domain-url";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitAuthHandler = (e) => {
    e.preventDefault();

    let nameValue, data, url;
    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please entered input!");
      return;
    }

    try {
      nameValue = nameInputRef.current.value;
      data = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      };
    } catch (error) {
      data = {
        email: emailValue,
        password: passwordValue,
      };
    }

    if (isLogin) {
      url = `${domainUrl}/auth/signin`;
    } else {
      url = `${domainUrl}/auth/signup`;
    }

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const { userId, name, token, isAdmin, expiresIn } = data;
        const idToken = token;

        const expiringTime =
          new Date().getTime() + new Date(+expiresIn * 1000).getTime();

        authCtx.login(userId, name, idToken, isAdmin, expiringTime);

        if (isAdmin) {
          history.push("/dashboard");
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={submitAuthHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <p className={classes.toggle} onClick={switchAuthModeHandler}>
          {isLogin ? "Register" : "Do you have account?"}
        </p>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
