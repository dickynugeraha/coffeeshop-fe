import { useState, useReducer, useRef } from "react";

import classes from "./CartEdit.module.css";
import Modal from "../UI/Modal";

const priceDispatch = (state, action) => {
  if (action.type === "ADD") {
    return {
      quantity: state.quantity + 1,
      pricePerItem: state.pricePerItem + action.price,
    };
  }
  if (action.type === "SUBS") {
    return {
      quantity: state.quantity - 1,
      pricePerItem: state.pricePerItem - action.price,
    };
  }

  return state;
};

const CartEdit = (props) => {
  const [description, setDescription] = useState(props.product.description);
  const descRef = useRef();
  const [priceState, dispatch] = useReducer(priceDispatch, {
    quantity: props.product.quantity,
    pricePerItem: props.product.pricePerItem,
  });

  const addQuantityHandler = () => {
    dispatch({ type: "ADD", price: props.product.price });
  };
  const subsQuantityHandler = () => {
    dispatch({ type: "SUBS", price: props.product.price });
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();

    props.onHiddenModal();

    props.onSubmitFormEdit({
      cartId: props.product.cartId,
      productId: props.product.productId,
      description: descRef.current.value,
      quantity: priceState.quantity,
      pricePerItem: priceState.pricePerItem,
    });
  };

  return (
    <Modal onHiddenModal={props.onHiddenModal} forComponent="cart">
      <div className={classes.form_edit}>
        <h3>Edit Product Cart</h3>
        <form onSubmit={editSubmitHandler}>
          <div className="form-control">
            <label htmlFor="quantity">
              Quantity ({priceState.quantity} pcs)
            </label>
            <div className={classes.quantity}>
              <span onClick={addQuantityHandler}>+</span>
              <span onClick={subsQuantityHandler}>-</span>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              onChange={descriptionChangeHandler}
              ref={descRef}
              value={description}
            />
          </div>
          <div className="form-control">
            <label>Update Price (Rp. {priceState.pricePerItem})</label>
          </div>
          <div className="action">
            <button onClick={editSubmitHandler}>Edit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CartEdit;
