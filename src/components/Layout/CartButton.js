import { useEffect, useState, useCallback } from "react";
import classes from "./CartButton.module.css";

import useHttp from "../../hooks/use-http";
import { fetchCartByUser } from "../../api/api-cart";

const CartButton = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const { status, data, sendingRequest } = useHttp(fetchCartByUser, true);

  const classCartButton = `${classes["btn_cart"]} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const changedCartItemHandler = useCallback(() => {
    sendingRequest();
  }, [sendingRequest]);

  useEffect(() => {
    sendingRequest();
  }, [sendingRequest]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timerOfBump = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timerOfBump);
    };
  }, [data, setBtnIsHighlighted]);

  return (
    <div className={classCartButton}>
      Cart <span>{status === "pending" ? "..." : data.length}</span>
    </div>
  );
};

export default CartButton;
