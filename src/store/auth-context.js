import { createContext, useState, useCallback } from "react";

let logoutTimer;

const AuthContext = createContext({
  userId: "",
  name: "",
  isAdmin: false,
  token: "",
  isLoggedIn: false,
  permOrder: true,
  login: () => {},
  logout: () => {},
  confirmOrder: () => {},
  denyOrder: () => {},
});

const calculateExpiringTime = (expiringTime) => {
  const currentTime = new Date().getTime();
  const timeExpiring = new Date(expiringTime).getTime();

  return timeExpiring - currentTime;
};

const retrivedStoredToken = () => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  const isAdmin = localStorage.getItem("isAdmin");
  const permOrder = localStorage.getItem("permOrder");
  const storedToken = localStorage.getItem("token");
  const expiringTime = localStorage.getItem("expiringTime");

  const reminingTime = calculateExpiringTime(expiringTime);

  if (reminingTime <= 0) {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("permOrder");
    localStorage.removeItem("token");
    localStorage.removeItem("expiringTime");

    return null;
  }

  return {
    userId: userId,
    name: name,
    isAdmin: isAdmin,
    permOrder: permOrder,
    token: storedToken,
    duration: expiringTime,
  };
};

export const AuthContextProvider = (props) => {
  const dataToken = retrivedStoredToken();
  let initialToken, initialUserId, initialName, initialAdmin, initialPermOrder;
  if (dataToken) {
    initialToken = dataToken.token;
    initialUserId = dataToken.userId;
    initialName = dataToken.name;
    initialAdmin = dataToken.isAdmin;
    initialPermOrder = dataToken.permOrder;
  }

  const [tokenVal, setTokenVal] = useState(initialToken);
  const [userIdVal, satUserIdVal] = useState(initialUserId);
  const [nameVal, setNameVal] = useState(initialName);
  const [isAdminVal, setIsAdminVal] = useState(initialAdmin);
  const [permOrder, setPermOrder] = useState(initialPermOrder);

  const userIsLoggedIn = !!tokenVal;
  const userIsAdmin = !!isAdminVal;
  const userPermOrder = !!permOrder;

  const loginHandler = (userId, name, token, isAdmin, expiringTime) => {
    setTokenVal(token);
    satUserIdVal(userId);
    setNameVal(name);
    setIsAdminVal(isAdmin);
    setPermOrder(true);

    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    if (isAdmin) {
      localStorage.setItem("isAdmin", "1");
    }
    if (!isAdmin) {
      localStorage.setItem("permOrder", "1");
    }
    localStorage.setItem("token", token);
    localStorage.setItem("expiringTime", expiringTime);

    const reminingTime = calculateExpiringTime(expiringTime);

    logoutTimer = setTimeout(logoutHandler, reminingTime);
  };

  const logoutHandler = useCallback(() => {
    setTokenVal(null);
    setIsAdminVal(false);
    setPermOrder(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("permOrder");
    localStorage.removeItem("token");
    localStorage.removeItem("expiringTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const confirmOrderHandler = () => {
    localStorage.setItem("permOrder", "1");
    setPermOrder(true);
  };

  const denyOrderHandler = () => {
    localStorage.removeItem("permOrder");
    setPermOrder(false);
  };

  const contextValue = {
    userId: userIdVal,
    isAdmin: userIsAdmin,
    name: nameVal,
    token: tokenVal,
    isLoggedIn: userIsLoggedIn,
    permOrder: userPermOrder,
    login: loginHandler,
    logout: logoutHandler,
    confirmOrder: confirmOrderHandler,
    denyOrder: denyOrderHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
