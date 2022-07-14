import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faCalendarCheck,
  faCheck,
  faTimesCircle,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./CheckoutStatus.module.css";

const CheckoutStatus = (props) => {
  const order = props.orderStatus;

  let classActiveVerMoney = "",
    classActiveProcess = "",
    classActiveDelivered = "";
  if (
    order === "verify_payment" ||
    order === "process" ||
    order === "delivered"
  ) {
    classActiveVerMoney = `${classes.active}`;
  }
  if (order === "process" || order === "delivered") {
    classActiveProcess = `${classes.active}`;
  }
  if (order === "delivered") {
    classActiveDelivered = `${classes.active}`;
  }

  const checkIcon = (
    <FontAwesomeIcon
      className={`${classes["sub-icon"]} ${classes.active}`}
      icon={faCheck}
    />
  );

  const denyIcon = (
    <FontAwesomeIcon
      className={`${classes["sub-icon"]}`}
      icon={faTimesCircle}
    />
  );
  return (
    <div className={classes.progress}>
      <ul className={classes["progress-item"]}>
        <li>
          <div>
            <FontAwesomeIcon
              className={`${classes.icon} ${classActiveVerMoney}`}
              icon={faMoneyBill1Wave}
            />
          </div>
          <div className={`${classActiveVerMoney} `}>
            {classActiveVerMoney.trim().length !== 0 ? checkIcon : denyIcon}
          </div>
          <p>Verify Payment</p>
        </li>
        <li>
          <div>
            <FontAwesomeIcon
              className={`${classes.icon} ${classActiveProcess}`}
              icon={faCogs}
            />
          </div>
          <div className={`${classActiveProcess}`}>
            {classActiveProcess.trim().length !== 0 ? checkIcon : denyIcon}
          </div>
          <p>Process</p>
        </li>
        <li>
          <div>
            <FontAwesomeIcon
              className={`${classes.icon} ${classActiveDelivered}`}
              icon={faCalendarCheck}
            />
          </div>
          <div className={classActiveDelivered}>
            {classActiveDelivered.trim().length !== 0 ? checkIcon : denyIcon}
          </div>
          <p>Delivered</p>
        </li>
      </ul>
    </div>
  );
};

export default CheckoutStatus;
