import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import WrapContent from "../../components/UI/WrapContent";
import AvailableCart from "../../components/Cart/AvailableCart";
import {
  fetchCartByUser,
  checkoutCart,
  getPermissionOrder,
} from "../../api/api-cart";
import useHttp from "../../hooks/use-http";

const LoadedProductCart = (userId) => {
  const {
    status,
    data: loadedProductCart,
    error,
    sendingRequest,
  } = useHttp(fetchCartByUser, true);

  useEffect(() => {
    sendingRequest({ userId: userId });
  }, [sendingRequest, userId]);

  const changedHandler = useCallback(() => {
    sendingRequest({ userId: userId });
  }, [sendingRequest, userId]);

  return {
    errorLoaded: error,
    statusLoaded: status,
    productLoaded: loadedProductCart,
    changedHandler,
  };
};

const CheckoutCartForOrder = (userId) => {
  const { sendingRequest: sendCheckoutCart, status: statusCheckout } =
    useHttp(checkoutCart);
  const orderHandler = (data) => {
    sendCheckoutCart({
      userId: userId,
      data,
    });
  };

  return {
    statusCheckout,
    orderHandler,
  };
};

const Cart = (props) => {
  const { userId, denyOrder } = props;
  const history = useHistory();

  // sending loaded cart product
  const { errorLoaded, statusLoaded, productLoaded, changedHandler } =
    LoadedProductCart(userId);

  // sending checkout procceed
  const { statusCheckout, orderHandler } = CheckoutCartForOrder(userId);

  // checking permision

  const denyOrderHandler = () => {
    denyOrder();
  };

  // redirect to checkout if user done orders
  useEffect(() => {
    if (statusCheckout === "completed") {
      history.push("/checkout");
    }
  }, [statusCheckout, history]);

  return (
    <WrapContent>
      <AvailableCart
        products={productLoaded}
        isLoading={statusLoaded === "pending"}
        error={errorLoaded}
        onChanged={changedHandler}
        onOrderHandler={orderHandler}
        onDenyOrder={denyOrderHandler}
        statusCheckout={statusCheckout}
      />
    </WrapContent>
  );
};

export default Cart;
