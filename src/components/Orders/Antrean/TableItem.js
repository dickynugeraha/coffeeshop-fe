import { Fragment, useContext, useState } from "react";
import ModalContext from "../../../store/modal-context";

const TableItem = (props) => {
  const modalCtx = useContext(ModalContext);
  const { order, onDetail, onChangeStatus } = props;

  const [statusValue, setStatusValue] = useState(order.status);

  const dateHelper = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString();
  };

  const showModalHandler = () => {
    modalCtx.showModal();
    onDetail({ userId: order.userId, orderId: order.orderId });
  };

  const changeStatusHandler = (e) => {
    setStatusValue(e.target.value);
    onChangeStatus({ orderId: order.orderId, status: e.target.value });
  };

  return (
    <Fragment>
      <td>{order.name}</td>
      <td>
        {(order.status === "cancel" || order.status === "success") &&
          `${order.status}`}

        {(order.status === "antrean" ||
          order.status === "process" ||
          order.status === "verify_payment" ||
          order.status === "delivered") && (
          <select onChange={changeStatusHandler} value={statusValue}>
            <option value="antrean">Antrean</option>
            <option value="verify_payment">Verify Payment</option>
            <option value="process">Process</option>
            <option value="delivered">Delivered</option>
            <option value="success">Success</option>
            <option value="cancel">Cancel</option>
          </select>
        )}
      </td>
      <td>{order.eat_by}</td>
      <td>{order.table_number}</td>
      <td>{order.payment_method}</td>
      <td>{dateHelper(order.date_order)}</td>
      <td>Rp. {order.allPrice}</td>
      <td>
        <span style={{ display: "flex", justifyContent: "center" }}>
          <p className="link" onClick={showModalHandler}>
            Detail
          </p>
        </span>
      </td>
    </Fragment>
  );
};

export default TableItem;
