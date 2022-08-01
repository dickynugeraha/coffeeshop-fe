import { useEffect, useState, useRef } from "react";
import { domainUrl } from "../../lib/domain-url";
import AvailableCheckout from "../../components/Checkout/AvailableCheckout";

const Checkout = ({ userId, name }) => {
  const [orders, setOrders] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);

  const fetchDataOrder = () => {
    fetch(`${domainUrl}/shop/order-get-by-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => {
        return response.json();
      })
      .then((dataOrder) => {
        setOrders(dataOrder.orders);
      });
  };

  const sendData = useRef(fetchDataOrder);

  useEffect(() => {
    setInterval(() => {
      sendData.current();
      setFirstLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <AvailableCheckout
        orders={orders}
        name={name}
        firstLoading={firstLoading}
      />
    </div>
  );
};

export default Checkout;
