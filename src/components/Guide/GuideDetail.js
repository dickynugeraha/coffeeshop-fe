import React from "react";
import Card from "../UI/Card";
import classes from "./GuideDetail.module.css";

const GuideDetail = () => {
  return (
    <div className={classes.wrap_guide}>
      <Card>
        <div className={classes.guide}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            HOW TO USE WEBSITE
          </h2>
          <ol>
            <li>You can view the product without doing the login first.</li>
            <li>
              The product you see is the original product according to the café
              menu, along with the cheap price.
            </li>
            <li>You can order a product when you already have an account.</li>
            <li>
              If you already have an account, select sign in, otherwise select
              the sign up.
            </li>
            <li>If you have forgotten your password, you can change this.</li>
            <li>
              Those of you who already have an account and do sign in, are
              allowed to order the menu you want.
            </li>
            <li>
              The ordered menu is sure to be given a description, as is the case
              with "spicy please", or "cold please". so that there's no miss
              communication between the two sides.
            </li>
            <li>
              After ordering, you can see your order cart in the cart menu
              section, where you can add, subtract or change the description of
              the sing
            </li>
            <li>
              At the bottom of the cart, there's a form to input the details of
              your order, whether it's being taken home or eating at the place.
            </li>
            <li>
              If you feel confident about your order, please press the checkout
              to perform the order.
            </li>
            <li>
              After placing an order, you will be directed to the checkout page
              to see the order details and status of your order.
            </li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default GuideDetail;
