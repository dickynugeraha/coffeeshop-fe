import { useContext } from "react";
import AntreanTable from "./AntreanTable";
import LoadingSpinner from "../../UI/LoadingSpinner";
import DetailOrder from "../DetailOrder";
import ModalContext from "../../../store/modal-context";

const OrderAntrean = (props) => {
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
    content = (
      <AntreanTable
        orders={props.orders}
        onDetail={props.onDetail}
        onChangeStatus={props.onChangeStatus}
      />
    );
  }

  return (
    <div>
      <div className="action">
        <h2 style={{ marginBottom: "4rem" }}>ORDER IN ANREAN</h2>
      </div>
      {content}
      {modalCtx.isShow && <DetailOrder order={props.order} />}
    </div>
  );
};

export default OrderAntrean;
