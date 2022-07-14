import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { domainUrl } from "../../lib/domain-url";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setIsChangePass(false);
  };

  const changePassHandler = () => {
    setIsChangePass(true);
  };

  const submitAuthHandler = (e) => {
    e.preventDefault();

    let nameValue, data, url;
    const phoneValue = phoneInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    if (!phoneValue || !passwordValue) {
      alert("Please entered input!");
      return;
    }
    if (phoneValue.trim().length < 10) {
      alert("Please entered valid phone number!");
      return;
    }

    try {
      nameValue = nameInputRef.current.value;
      data = {
        name: nameValue,
        phone: phoneValue,
        password: passwordValue,
      };
    } catch (err) {
      data = {
        phone: phoneValue,
        password: passwordValue,
      };
    }

    if (isChangePass) {
      setIsLoading(true);
      fetch(`${domainUrl}/auth/account`, {
        method: "PUT",
        body: JSON.stringify({
          phone: phoneValue,
          newPassword: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          setIsLogin(true);
          setIsChangePass(false);

          alert("Successfully change password!");
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err.message);
        });
      return;
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
          if (res.status === 401) {
            return res.json().then((data) => {
              throw new Error(data.message);
            });
          }
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
      <h1>
        {isLogin && !isChangePass ? "Sign In" : ""}
        {!isLogin && !isChangePass ? "Sign Up" : ""}
        {isChangePass && "Change Password"}
      </h1>
      <form onSubmit={submitAuthHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input type="phone" id="phone" required ref={phoneInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">{isChangePass ? "New " : ""}Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actionAuth}>
          <div>
            <p className={classes.toggle} onClick={switchAuthModeHandler}>
              {isLogin ? "Register" : "Do you have account?"}
            </p>
          </div>
          <div>
            <p className={classes.toggle} onClick={changePassHandler}>
              {isLogin && !isChangePass ? "Forget the password?" : ""}
            </p>
          </div>
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button>
              {isLogin && !isChangePass ? "login" : ""}
              {!isLogin && !isChangePass ? "Create account" : ""}
              {isChangePass && "Update"}
            </button>
          )}
          {isLoading && <p>Loading...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
