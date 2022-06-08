import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCogs,
  faCalendarCheck,
  faCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./CheckoutStatus.module.css";

const CheckoutStatus = (props) => {
  const order = props.orderStatus;

  let classActiveAntrean = "",
    classActiveProcess = "",
    classActiveDelivered = "";
  if (order === "antrean" || order === "process" || order === "delivered") {
    classActiveAntrean = `${classes.active}`;
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
              className={`${classes.icon} ${classActiveAntrean}`}
              icon={faUserFriends}
            />
          </div>
          <div className={`${classActiveAntrean} `}>
            {classActiveAntrean.trim().length !== 0 ? checkIcon : denyIcon}
          </div>
          <p>Antrean</p>
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
