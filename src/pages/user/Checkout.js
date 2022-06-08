import { useEffect, useState } from "react";

import AvailableCheckout from "../../components/Checkout/AvailableCheckout";

const Checkout = (props) => {
  const [detailOrder, setDetailOrder] = useState({
    status: "",
    orders: [],
  });

  useEffect(() => {
    fetch(`http://localhost:3002/shop/order-get-by-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.userId }),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((dataOrder) => {
        setDetailOrder({
          status: dataOrder.status,
          orders: dataOrder.orders,
        });
      });
  }, []);

  return (
    <div>
      <AvailableCheckout
        orders={detailOrder.orders}
        status={detailOrder.status}
      />
    </div>
  );
};

export default Checkout;
