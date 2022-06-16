import React from "react";
import classes from "./CheckoutItem.module.css";

const CheckoutItem = (props) => {
  return (
    <div className={classes.checkoutDesc}>
      <div>
        <p className={classes.title}>{props.title}</p>
        <p className={classes.price}>
          (Rp. {props.price} x {props.quantity} pcs)
        </p>
      </div>
      <div>
        <p>Rp. {props.pricePerItem}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
