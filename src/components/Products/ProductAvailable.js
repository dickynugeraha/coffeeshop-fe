import { useContext } from "react";

import classes from "./ProductAvailable.module.css";
import ProductItem from "./ProductItem";
import ProductItemForm from "./ProductItemForm";
import ModalContext from "../../store/modal-context";

let id, price;

const ProductAvailable = ({ products, productFilter }) => {
  const modalCtx = useContext(ModalContext);

  const valueCartHandler = (data) => {
    id = data.id;
    price = data.price;
  };

  const closeModalHandler = () => {
    modalCtx.hiddenModal(false);
  };

  const dataFiltering = products.filter((item) => item.type === productFilter);

  return (
    <div className={classes["products"]}>
      <ul>
        {(productFilter === "all" ? products : dataFiltering).map(
          (item) =>
            item.isAvailable && (
              <ProductItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                description={item.description}
                valueCart={valueCartHandler}
              />
            )
        )}
      </ul>
      {modalCtx.isShow && (
        <ProductItemForm
          id={id}
          price={price}
          onHiddenModal={closeModalHandler}
        />
      )}
    </div>
  );
};

export default ProductAvailable;
