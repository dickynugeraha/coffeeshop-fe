import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHiddenModal} />;
};
const ModalOverlays = (props) => {
  return (
    <div className={`${classes.modal} ${classes[props.forComponent]}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalPointer = document.getElementById("overlays");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backrop onHiddenModal={props.onHiddenModal} />,
        portalPointer
      )}
      {ReactDom.createPortal(
        <ModalOverlays forComponent={props.forComponent}>
          {props.children}
        </ModalOverlays>,
        portalPointer
      )}
    </Fragment>
  );
};

export default Modal;
