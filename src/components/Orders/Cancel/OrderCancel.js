import { useContext } from "react";
import OrderTable from "../OrderTable";
import LoadingSpinner from "../../UI/LoadingSpinner";
import DetailOrder from "../DetailOrder";
import ModalContext from "../../../store/modal-context";

const OrderCancel = (props) => {
  const modalCtx = useContext(ModalContext);

  let content;

  if (props.status === "pending") {
    content = (
      <div className="action">
        <LoadingSpinner />
      </div>
    );
  }
  if (props.status === "completed") {
    content = <OrderTable orders={props.orders} onDetail={props.onDetail} />;
  }

  return (
    <div>
      <div className="action">
        <h2 style={{ marginBottom: "4rem" }}>ORDER CANCEL</h2>
      </div>
      {content}
      {modalCtx.isShow && <DetailOrder order={props.order} />}
    </div>
  );
};

export default OrderCancel;
