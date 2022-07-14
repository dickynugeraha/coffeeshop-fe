import { createContext, useReducer } from "react";

const OrderContext = createContext({
  items: [],
  isChange: false,
  setValue: () => {},
  addItem: () => {},
  updateStatus: () => {},
});

const initialValue = {
  items: [],
  isChange: false,
};

const orderReducer = (state, action) => {
  if (action.type === "SET_VALUE") {
    const items = action.items;

    return {
      items: items,
      isChange: false,
    };
  }
  if (action.type === "ADD") {
    const updateItems = state.items.concat(action.item);

    return {
      items: updateItems,
      isChange: true,
    };
  }
  if (action.type === "UPDATE_STATUS") {
    const indexOfItem = state.items.findIndex(
      (item) => item.orderId === action.orderId
    );

    const itemChoose = state.items[indexOfItem];

    let updatedItems;
    if (itemChoose) {
      const updateItem = {
        ...itemChoose,
        status: action.status,
      };

      updatedItems = [...state.items];
      updatedItems[indexOfItem] = updateItem;
    }

    return {
      items: updatedItems,
      isChange: true,
    };
  }

  return {
    items: state.items,
    isChange: state.isChange,
  };
};

export const OrderContextProvider = (props) => {
  const [orderState, dispatchOrder] = useReducer(orderReducer, initialValue);

  const setValueHandler = (items) => {
    dispatchOrder({ type: "SET_VALUE", items: items });
  };

  const changeStatusHandler = (orderId, status) => {
    dispatchOrder({ type: "UPDATE_STATUS", orderId: orderId, status: status });
  };

  const addItemHandler = (item) => {
    dispatchOrder({ type: "ADD", item: item });
  };

  const orderValue = {
    items: orderState.items,
    isChange: orderState.isChange,
    setValue: setValueHandler,
    addItem: addItemHandler,
    updateStatus: changeStatusHandler,
  };

  return (
    <OrderContext.Provider value={orderValue}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
