import classes from "./AvailableCheckout.module.css";
import OrderItems from "./OrderItems";
import LoadingSpinner from "../UI/LoadingSpinner";

const AvailableCheckout = (props) => {
  const { orders, name, firstLoading } = props;

  let checkoutContent;

  if (orders.length !== 0) {
    checkoutContent = orders?.map((item, index) => (
      <div className={classes["checkout-item"]} key={index}>
        <OrderItems products={item.products} status={item.status} />
      </div>
    ));
  }
  if (orders.length === 0) {
    checkoutContent = (
      <div className="action" style={{ margin: "8rem" }}>
        <h4>NOT ORDER YET!</h4>
      </div>
    );
  }
  if (firstLoading) {
    checkoutContent = (
      <div className="action" style={{ margin: "6rem" }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className={classes.container}>
      <h1 className={`title ${classes.forName}`}>{name}'s order</h1>
      {checkoutContent}
    </section>
  );
};

export default AvailableCheckout;
