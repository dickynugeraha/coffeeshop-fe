import { useContext } from "react";

import Modal from "../UI/Modal";
import ModalContext from "../../store/modal-context";
import CheckoutItem from "../Checkout/CheckoutItem";
import "./DetailOrder.css";

const DetailOrder = (props) => {
  const { order } = props;

  const modalCtx = useContext(ModalContext);

  const hiddenModalHandler = () => {
    modalCtx.hiddenModal();
  };

  return (
    <Modal onHiddenModal={hiddenModalHandler} forComponent="cart">
      <ul className="itemOrder">
        <h3 className="title">Detail Order</h3>
        {order.length !== 0 &&
          order.order.map((item) => (
            <CheckoutItem
              id={item.id}
              key={item.id}
              title={item.title}
              quantity={item.orderItem.quantity}
              description={item.orderItem.description}
              price={item.price}
              pricePerItem={item.orderItem.pricePerItem}
            />
          ))}
      </ul>
    </Modal>
  );
};

export default DetailOrder;
