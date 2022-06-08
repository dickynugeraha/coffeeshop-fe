import { useContext } from "react";
import classes from "./CartItem.module.css";
import image from "../../assets/coffee-food-3.jpg";
import ModalContext from "../../store/modal-context";

const CartItem = (props) => {
  const modalCtx = useContext(ModalContext);

  const openModalHandler = () => {
    modalCtx.showModal();
    props.cartValue({ cartId: props.cartId, productId: props.productId });
  };

  const deleteItemHandler = () => {
    const isDeletedCart = window.confirm(
      "Do you want to delete your product cart?"
    );
    if (isDeletedCart) {
      props.onDeleteItem({ cartId: props.cartId, productId: props.productId });
    }
  };

  return (
    <li className={classes.cartProducts}>
      <div className={classes.descControl}>
        <div className={classes.imageCart}>
          <img src={image} alt="product" />
        </div>
        <div className={classes.desc}>
          <h3 className="title">
            {props.title} <span>(x{props.quantity})</span>
          </h3>
          <p>{props.description}</p>
          <div className={classes.action}>
            <span onClick={openModalHandler}>edit</span>
            <span onClick={deleteItemHandler}>delete</span>
          </div>
        </div>
      </div>
      <div className={classes.price}>
        <h3 className="title">Rp. {props.pricePerItem}</h3>
      </div>
    </li>
  );
};

export default CartItem;
