import React from "react";
import { useParams } from "react-router-dom";
import OrderAntrean from "../../components/Orders/Antrean/OrderAntrean";
import OrderSuccess from "../../components/Orders/Success/OrderSuccess";
import OrderCancel from "../../components/Orders/Cancel/OrderCancel";

const Order = () => {
  const { status } = useParams();
  return (
    <div>
      {status === "antrean" && <OrderAntrean />}
      {status === "success" && <OrderSuccess />}
      {status === "cancel" && <OrderCancel />}
    </div>
  );
};

export default Order;
