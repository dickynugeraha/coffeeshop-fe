import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { getOrderByStatus } from "../../../api/api-order";

const OrderAntrean = () => {
  const {
    data: orders,
    sendingRequest: getOrders,
    status,
    error,
  } = useHttp(getOrderByStatus, true);

  useEffect(() => {
    getOrders("antrean");
  }, [getOrders]);

  console.log(orders);

  return <div>OrderAntrean</div>;
};

export default OrderAntrean;
