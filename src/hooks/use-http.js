import { useReducer, useCallback } from "react";

const httpDispatch = (state, actoin) => {
  if (actoin.type === "SEND") {
    return {
      error: null,
      data: [],
      status: "pending",
    };
  }
  if (actoin.type === "SUCCESS") {
    return {
      error: null,
      data: actoin.responseData,
      status: "completed",
    };
  }
  if (actoin.type === "ERROR") {
    return {
      error: actoin.errorMessage,
      data: null,
      status: "completed",
    };
  }
  return state;
};

const useHttp = (requestFunc, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpDispatch, {
    error: null,
    data: [],
    status: startWithPending ? "pending" : null,
  });

  const sendingRequest = useCallback(
    async (reqData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunc(reqData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunc]
  );
  return {
    sendingRequest,
    ...httpState,
  };
};

export default useHttp;
