import classes from "./AvailableCheckout.module.css";
import OrderItems from "./OrderItems";
import LoadingSpinner from "../UI/LoadingSpinner";
import WrapContent from "../UI/WrapContent";

const AvailableCheckout = (props) => {
  const { orders, name, firstLoading, loadOrder } = props;

  let checkoutContent;

  if (orders.length !== 0) {
    checkoutContent = orders?.map((item, index) => (
      <div className={classes["checkout-item"]} key={index}>
        <OrderItems
          status={item.status}
          dateOrder={item.dateOrder}
          eat_by={item.eat_by}
          table_number={item.table_number}
          products={item.products}
        />
      </div>
    ));
  }
  if (orders.length === 0 && !loadOrder) {
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
    <WrapContent>
      <section className={classes.container}>
        <h1 className="title">{name}'s order</h1>
        {checkoutContent}
      </section>
    </WrapContent>
  );
};

export default AvailableCheckout;
