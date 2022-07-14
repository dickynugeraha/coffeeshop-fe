import React from "react";
import Card from "../UI/Card";
import classes from "./AvailableCheckout.module.css";
import CheckoutItem from "./CheckoutItem";
import CheckoutStatus from "./CheckoutStatus";

const OrderItems = (props) => {
  const { products, status } = props;

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
    <Card>
      <div className={classes.wrap}>
        <div>
          <h1 className="title">Detail</h1>
          <ul className={classes.itemOrder}>
            {products.map((item) => (
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
            {status === "antrean" && <h4>Prepare your money, please</h4>}
            {status === "verify_payment" && (
              <h4 className="success">
                Verified payment, Please screenshot for proof of payment{" "}
              </h4>
            )}
            {status === "process" && (
              <h4>Your order is in the making, please dont left your table</h4>
            )}
            {status === "delivered" && (
              <h4 className="success">Your order is already on delivery</h4>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderItems;
