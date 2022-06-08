import { Fragment } from "react";
import classes from "./Content.module.css";
import coffeeFood from "../../assets/cafe.jpg";

const Content = () => {
  return (
    <Fragment>
      <div className={classes["product-image"]}>
        <img src={coffeeFood} alt="coffee food" loading="lazy" />
      </div>
      <div className={classes.summary}>
        <h2 className="title">Delicious Coffee, Delivered To You</h2>
        <p>
          Choose your favorite food or coffee from our broad selection of
          available meals and enjoy a delicious lunch or dinner at table.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </div>
    </Fragment>
  );
};

export default Content;
