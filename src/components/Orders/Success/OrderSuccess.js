import { useEffect, Fragment } from "react";
import OrderTable from "../OrderTable";
import useHttp from "../../../hooks/use-http";
import { getOrderByStatus } from "../../../api/api-order";
import LoadingSpinner from "../../UI/LoadingSpinner";

const OrderSuccess = () => {
  const {
    data: orders,
    sendingRequest: getSuccessOrder,
    status,
    error,
  } = useHttp(getOrderByStatus);

  useEffect(() => {
    getSuccessOrder("success");
  }, [getSuccessOrder]);

  const BodyContentComponent = BodyContent(status, orders);

  return (
    <div>
      <OrderTable title="Success Orders">
        <BodyContentComponent />
      </OrderTable>
    </div>
  );
};

const BodyContent = (status, orders) => {
  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return orders?.map((item) => (
    <tr>
      <Fragment>
        <td>{item.title}</td>
        <td>{item.type}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
      </Fragment>
    </tr>
  ));
};

export default OrderSuccess;
