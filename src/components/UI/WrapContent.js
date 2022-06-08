import React from "react";
import classes from "./WrapContent.module.css";

const WrapContent = (props) => {
  return <div className={classes.wrap}>{props.children}</div>;
};

export default WrapContent;
