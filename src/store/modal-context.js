import React, { useState } from "react";

const ModalContext = React.createContext({
  isShow: false,
  showModal: () => {},
  hiddenModal: () => {},
});

export const ModalContextProvider = (props) => {
  const [modalIsShow, setModalIsShow] = useState(false);

  const modalShowHandler = () => {
    setModalIsShow(true);
  };

  const modalHiddenHandler = () => {
    setModalIsShow(false);
  };

  const valueContext = {
    isShow: modalIsShow,
    showModal: modalShowHandler,
    hiddenModal: modalHiddenHandler,
  };

  return (
    <ModalContext.Provider value={valueContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
