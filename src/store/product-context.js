import { createContext, useState } from "react";

const ProductContext = createContext({
  isChanged: false,
  changesProduct: () => {},
});

export const ProductContextProvider = (props) => {
  const [isChanged, setIsChanged] = useState(false);

  const changesProductHandler = (isChanged) => {
    setIsChanged(isChanged);
  };

  const productValue = {
    isChanged: isChanged,
    changesProduct: changesProductHandler,
  };
  return (
    <ProductContext.Provider value={productValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
