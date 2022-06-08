import React from "react";
import classes from "./Image.module.css";

const Image = (props) => {
  const mainStyle = {
    width: props.width,
    height: props.height,
    margin: props.margin,
    display: "flex",
    justifyContent: "flex-start",
  };
  return (
    <div className={classes.image} style={mainStyle}>
      <img src={props.imageUrl} alt="img" srcSet={props.imageUrl} />
    </div>
  );
};

export default Image;
