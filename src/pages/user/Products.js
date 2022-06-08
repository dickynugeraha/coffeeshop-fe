import { Fragment, useContext, useEffect, useState, useCallback } from "react";

import useHttp from "../../hooks/use-http";
import { getProducts } from "../../api/api-product";
import Content from "../../components/Layout/Content";
import ProductAvailable from "../../components/Products/ProductAvailable";
import ProductFilter from "../../components/Products/ProductFilter";
import ProductContext from "../../store/product-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Products = () => {
  const productsCtx = useContext(ProductContext);
  const { isChanged, changesProduct } = productsCtx;
  const [type, setType] = useState("all");

  const { data: products, status, sendingRequest } = useHttp(getProducts);
  useEffect(() => {
    sendingRequest();
  }, [sendingRequest]);

  const changgingLoadedProd = useCallback(() => {
    sendingRequest();
  }, [sendingRequest]);

  useCallback(() => {
    if (isChanged) {
      changgingLoadedProd();
      changesProduct(false);
    }
  }, [isChanged, changgingLoadedProd, changesProduct]);

  const changeTypeProductHandler = (typeValue) => {
    setType(typeValue);
  };

  let content;
  if (status === "pending") {
    content = (
      <div className="action" style={{ marginBottom: "4rem" }}>
        <LoadingSpinner />
      </div>
    );
  } else if (status === "completed") {
    content = <ProductAvailable products={products} productFilter={type} />;
  }

  return (
    <Fragment>
      <Content />
      <ProductFilter
        onChangeTypeProduct={changeTypeProductHandler}
        defaultTypeSelected={type}
      />
      {content}
    </Fragment>
  );
};

export default Products;
