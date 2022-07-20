import {
  Fragment,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";

import classes from "./AvailableCart.module.css";
import CartItem from "./CartItem";
import ModalContext from "../../store/modal-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import CartEdit from "./CartEdit";
import useHttp from "../../hooks/use-http";
import {
  getEditCart,
  postEditProductCart,
  deletedCart,
} from "../../api/api-cart";

let cartId, productId;

// deleted cart
const DeleteCarthandler = () => {
  const {
    sendingRequest: sendingDeleteRequest,
    status: statusDeletedCart,
    error: errorDeletedCart,
  } = useHttp(deletedCart);

  const deleteItemHandler = useCallback(
    (data) => {
      sendingDeleteRequest(data);
    },
    [sendingDeleteRequest]
  );

  return {
    statusDeletedCart,
    errorDeletedCart,
    deleteItemHandler,
  };
};

// loaded product
const LoadedProductForEdit = () => {
  const { data: loadedProductEdit, sendingRequest: getEditRequest } =
    useHttp(getEditCart);

  const cartValueHandler = useCallback(
    (dataForEdit) => {
      cartId = dataForEdit.cartId;
      productId = dataForEdit.productId;
      getEditRequest({ cartId, productId });
    },
    [getEditRequest]
  );

  return {
    loadedProductEdit,
    cartValueHandler,
  };
};

// Sending edit post
const SendDataEdit = () => {
  const {
    sendingRequest: sendingPostEdit,
    error: errorPostEdit,
    status: statusEdit,
  } = useHttp(postEditProductCart);

  const submitEditHandler = useCallback(
    (data) => {
      sendingPostEdit(data);
    },
    [sendingPostEdit]
  );

  return {
    errorPostEdit,
    statusEdit,
    submitEditHandler,
  };
};

const AvailableCart = ({
  products,
  isLoading,
  onChanged,
  error,
  onOrderHandler,
  statusCheckout,
}) => {
  const [showComponentTable, setShowComponentTable] = useState(false);
  const [showComponentPayment, setShowComponentPayment] = useState(false);

  const modalCtx = useContext(ModalContext);

  const [eatBy, setEatBy] = useState("");
  const tableCategoryRef = useRef();
  const tableNumberRef = useRef();
  const paymentMethodRef = useRef();

  const hiddenModalHandler = () => {
    modalCtx.hiddenModal();
  };

  // Delete cart product
  const { statusDeletedCart, errorDeletedCart, deleteItemHandler } =
    DeleteCarthandler();

  // Loaded product for edit
  const { loadedProductEdit, cartValueHandler } = LoadedProductForEdit();

  // Sending Post Edit
  const { errorPostEdit, statusEdit, submitEditHandler } = SendDataEdit();

  // rerender data product
  useEffect(() => {
    if (
      statusEdit === "completed" ||
      statusDeletedCart === "completed" ||
      !errorPostEdit ||
      !errorDeletedCart
    ) {
      onChanged();
    }
  }, [
    onChanged,
    statusEdit,
    statusDeletedCart,
    errorPostEdit,
    errorDeletedCart,
  ]);

  const checkoutSubmitHandler = () => {
    if (eatBy.trim() === "") {
      alert("Please choose eat by!");
      return;
    }

    let tableNumber, data;
    const paymentMethod = paymentMethodRef.current.value;

    try {
      tableNumber = `${tableCategoryRef.current.value}${tableNumberRef.current.value}`;
      data = {
        eat_by: eatBy,
        table_number: tableNumber,
        payment_method: paymentMethod,
      };
    } catch (error) {
      data = {
        eat_by: eatBy,
        payment_method: paymentMethod,
      };
    }

    onOrderHandler(data);
  };

  let content;
  if (products.length !== 0 || products) {
    content = products.map((item) => (
      <CartItem
        key={item.id}
        cartId={item.cartId}
        productId={item.productId}
        title={item.title}
        imageUrl={item.imageUrl}
        quantity={item.quantity}
        description={item.description}
        pricePerItem={item.pricePerItem}
        cartValue={cartValueHandler}
        onDeleteItem={deleteItemHandler}
      />
    ));
  }
  if (products.length === 0) {
    content = <h3 className="action">PLEASE ADD PRODUCT TO CART!</h3>;
  }
  if (error) {
    content = <p className="action">{error}</p>;
  }

  // helper
  const summaryPrice = [];
  for (const key in products) {
    summaryPrice.push(products[key].pricePerItem);
  }
  const sum = summaryPrice.reduce(
    (totalValue, currValue) => totalValue + currValue,
    0
  );

  return (
    <Fragment>
      <div className={classes.cart}>
        <h1>CART</h1>
        {isLoading && (
          <div className="action">
            <LoadingSpinner />
          </div>
        )}
        <ul>{content}</ul>

        <div className={classes.total}>
          <h2 className="title">Total</h2>
          <h2 className="title">Rp. {sum}</h2>
        </div>

        <div className={classes.section_eat}>
          <div className={classes.eat_by}>
            <div className={classes.inputed}>
              <select
                type="text"
                id="eat_by"
                onChange={(e) => {
                  setEatBy(e.target.value);

                  e.target.value === "Dine In"
                    ? setShowComponentTable(true)
                    : setShowComponentTable(false);

                  e.target.value !== ""
                    ? setShowComponentPayment(true)
                    : setShowComponentPayment(false);
                }}
              >
                <option value="">--Choose--</option>
                <option value="Dine In">Dine in</option>
                <option value="Take Away">Take away</option>
              </select>
            </div>
          </div>
          <div className={classes.section_table}>
            {showComponentTable && (
              <div className={classes.table_number}>
                <div>
                  <label htmlFor="table_number">Table number</label>
                </div>
                <div className={classes.inputed}>
                  <select name="category" ref={tableCategoryRef}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                  <select name="number" ref={tableNumberRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            )}
            {showComponentPayment && (
              <div className={classes.payment}>
                <div>
                  <label htmlFor="payment">Payment method</label>
                </div>
                <div className={classes.inputed}>
                  <select id="payment_method" ref={paymentMethodRef}>
                    <option value="Cash">Cash</option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={classes.action}>
          <button onClick={checkoutSubmitHandler}>
            {statusCheckout === "pending"
              ? "LOADING..."
              : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
      {modalCtx.isShow && loadedProductEdit.length !== 0 && (
        <CartEdit
          product={loadedProductEdit}
          onHiddenModal={hiddenModalHandler}
          onSubmitFormEdit={submitEditHandler}
        />
      )}
    </Fragment>
  );
};

export default AvailableCart;
