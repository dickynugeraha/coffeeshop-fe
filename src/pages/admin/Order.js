import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {
  getOrderByStatus,
  getDetailOrder,
  editStatusOrder,
} from "../../api/api-order";
import WrapContent from "../../components/UI/WrapContent";

import OrderAntrean from "../../components/Orders/Antrean/OrderAntrean";
import OrderSuccess from "../../components/Orders/Success/OrderSuccess";
import OrderCancel from "../../components/Orders/Cancel/OrderCancel";

const GetAllOrders = (status) => {
  const {
    data: orders,
    sendingRequest: getOrders,
    status: statusFetch,
    error,
  } = useHttp(getOrderByStatus, true);

  useEffect(() => {
    getOrders(status);
  }, [getOrders, status]);

  const fetchAgain = useCallback(() => {
    getOrders(status);
  }, [getOrders, status]);

  return {
    orders,
    statusFetch,
    error,
    fetchAgain,
  };
};

const GetDetailOrder = () => {
  const {
    data: order,
    sendingRequest: getOrder,
    status: statusFetchSingle,
  } = useHttp(getDetailOrder, true);

  const detailAntreanOrderHandler = (data) => {
    getOrder(data);
  };
  const detailSuccessOrderHandler = (data) => {
    getOrder(data);
  };
  const detailCancelOrderHandler = (data) => {
    getOrder(data);
  };

  return {
    order,
    statusdetail: statusFetchSingle,
    detailAntreanOrderHandler,
    detailSuccessOrderHandler,
    detailCancelOrderHandler,
  };
};

const UpdateStatusOrder = () => {
  const { sendingRequest: updateStatusOrder, status: statusChange } =
    useHttp(editStatusOrder);

  const changeStatusHandler = (data) => {
    updateStatusOrder(data);
  };

  return {
    changeStatusHandler,
    statusChange,
  };
};

const Order = () => {
  const { status } = useParams();

  const { orders, statusFetch, fetchAgain } = GetAllOrders(status);
  const {
    order,
    detailAntreanOrderHandler,
    detailSuccessOrderHandler,
    detailCancelOrderHandler,
  } = GetDetailOrder();
  const { changeStatusHandler, statusChange } = UpdateStatusOrder();

  const changeStatusCompleted = (data) => {
    changeStatusHandler(data);
  };

  useEffect(() => {
    if (statusChange === "completed") {
      fetchAgain();
    }
  }, [fetchAgain, statusChange]);

  return (
    <WrapContent>
      <div style={{ padding: "5% 9%" }}>
        <div style={{ margin: "3rem auto" }}>
          {status === "antrean" && (
            <OrderAntrean
              orders={orders}
              status={statusFetch}
              order={order}
              onDetail={detailAntreanOrderHandler}
              onChangeStatus={changeStatusCompleted}
            />
          )}
          {status === "success" && (
            <OrderSuccess
              orders={orders}
              status={statusFetch}
              onDetail={detailSuccessOrderHandler}
              order={order}
            />
          )}
          {status === "cancel" && (
            <OrderCancel
              orders={orders}
              status={statusFetch}
              onDetail={detailCancelOrderHandler}
              order={order}
            />
          )}
        </div>
      </div>
    </WrapContent>
  );
};

export default Order;
