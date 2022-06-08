import React, { useState, useEffect, useCallback } from "react";
import useHttp from "../hooks/use-http";
import { getPermissionOrder } from "../api/api-cart";

const permOrderContext = React.createContext({
  isOrderAgain: true,
  checkingPermission: () => {},
});

const InitialPermissionHandler = (userId) => {
  const { sendingRequest, data } = useHttp(getPermissionOrder, false);

  useEffect(() => {
    sendingRequest(userId);
  }, [sendingRequest, userId]);

  const rerenderValue = useCallback(() => {
    sendingRequest(userId);
  }, [sendingRequest, userId]);

  if (typeof data === "boolean") {
    return { data, rerenderValue };
  }
};

export const PermOrderContextProvider = (props) => {
  const [orderAgain, setOrderAgain] = useState(false);

  const checkingPermissionHandler = (userId) => {
    const { data } = InitialPermissionHandler(userId);
    setOrderAgain(data);
  };

  const valuePermission = {
    isOrderAgain: orderAgain,
    checkingPermission: checkingPermissionHandler,
  };

  return (
    <permOrderContext.Provider value={valuePermission}>
      {props.children}
    </permOrderContext.Provider>
  );
};

export default permOrderContext;
