import React from "react";

import CheckoutItem from "./CheckoutItem";
import CheckoutStatus from "./CheckoutStatus";
import Card from "../UI/Card";
import classes from "./AvailableCheckout.module.css";

const AvailableCheckout = (props) => {
  const products = props.orders;
  const status = props.status;

  // helper
  const summaryPrice = [];
  for (const key in products) {
    summaryPrice.push(products[key].pricePerItem);
  }
  const sum = summaryPrice.reduce(
    (totalValue, currValue) => totalValue + currValue,
    0
  );

  return (
    <section className={classes.container}>
      <h1 className={`title ${classes.forName}`}>ikky's order</h1>
      <Card>
        <div className={classes.wrap}>
          <div>
            <h1 className="title">Detail</h1>
            <ul className={classes.itemOrder}>
              {products &&
                products.map((item) => (
                  <CheckoutItem
                    id={item._id}
                    key={`${item._id}${Math.random(Math.floor(3))}`}
                    title={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    pricePerItem={item.pricePerItem}
                  />
                ))}
            </ul>
            <div className={classes.totalAmount}>
              <span>Total Amount</span>
              <span>Rp. {sum}</span>
            </div>
          </div>
          <div>
            <div>
              <h1 className="title">Status</h1>
              <CheckoutStatus orderStatus={status} />
              {/* {(status === "antrean" || status === "process") && (
                <h2>Please prepare your money!</h2>
              )} */}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AvailableCheckout;
