import { useContext, useState, useEffect } from "react";
import useHttp from "../.../../../../hooks/use-http";
import { getOrderByDate } from "../../../api/api-order";
import OrderTable from "../OrderTable";
import LoadingSpinner from "../../UI/LoadingSpinner";
import DetailOrder from "../DetailOrder";
import ModalContext from "../../../store/modal-context";
import FilterOrder from "./FilterOrder";

const OrderSuccess = (props) => {
  const [orders, setOrders] = useState([]);
  const modalCtx = useContext(ModalContext);

  console.log(props.orders);

  const {
    data,
    status: statusFilter,
    sendingRequest,
  } = useHttp(getOrderByDate);

  const filterOrderHandler = ({ start, end }) => {
    sendingRequest({ start, end });
    setOrders(data);
  };

  useEffect(() => {
    if (statusFilter === "completed") {
      setOrders(data);
    }
  }, [statusFilter, data]);

  let content = "";

  if (props.status === "pending" || statusFilter === "pending") {
    content = (
      <div className="action">
        <LoadingSpinner />
      </div>
    );
  }

  if (props.status === "completed" || statusFilter === "completed") {
    if (orders.length !== 0) {
      content = <OrderTable orders={orders} onDetail={props.onDetail} />;
    }
  }

  return (
    <div>
      <div className="action">
        <h2 style={{ marginBottom: "4rem" }}>ORDER SUCCESS</h2>
      </div>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <FilterOrder onFilterOrder={filterOrderHandler} />
      </div>
      {content}
      {modalCtx.isShow && <DetailOrder order={props.order} />}
    </div>
  );
};

export default OrderSuccess;
