import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProductItemForm.module.css";
import { addToCart } from "../../api/api-cart";
import useHttp from "../../hooks/use-http";
import Modal from "../../components/UI/Modal";
import AuthContext from "../../store/auth-context";

const ProductItemForm = (props) => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const amountRef = useRef();
  const [description, setDescription] = useState("");

  const { sendingRequest: sendingAddCart, status } = useHttp(addToCart);

  const addCartHandler = (e) => {
    e.preventDefault();

    if (!authCtx.isLoggedIn) {
      alert("Please login first!");
      props.onHiddenModal();
      return history.push("/login");
    }

    const quantity = amountRef.current.value;

    if (description.trim().length === 0) {
      setDescription("no description");
    }

    const valueNewCart = {
      userId: authCtx.userId,
      productId: props.id,
      price: props.price,
      description: description,
      quantity: parseInt(quantity),
    };

    sendingAddCart(valueNewCart);

    setDescription("");
    props.onHiddenModal();
  };

  return (
    <Modal onHiddenModal={props.onHiddenModal} forComponent="product">
      <form className={classes.form} onSubmit={addCartHandler}>
        <h3 className="title">Detail Order</h3>
        <div className="form-control">
          <label htmlFor={`amount_ + ${props.id}`}>Amount</label>
          <input
            ref={amountRef}
            id={`amount_ + ${props.id}`}
            type="number"
            min="1"
            max="5"
            step="1"
            defaultValue="1"
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            placeholder="..."
          />
        </div>
        <div className="action">
          <button disabled={status === "pending" ? true : false}>
            {status === "pending" ? "..." : "+ Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductItemForm;
