import { Fragment, useState, useContext } from "react";
import classes from "./ProductItem.module.css";
import image from "../../assets/coffee-food-3.jpg";
import ModalContext from "../../store/modal-context";
import Image from "../UI/Image";

const ProductItem = (props) => {
  const modalCtx = useContext(ModalContext);

  const [classHover, setClassHover] = useState(false);

  const mouseOverHandler = () => {
    setClassHover(true);
  };
  const mouseOutHandler = () => {
    setClassHover(false);
  };

  const openModalHandler = () => {
    modalCtx.showModal();
    setClassHover(false);
    props.valueCart({ id: props.id, price: props.price });
  };

  return (
    <Fragment>
      <li
        className={`${classes.product} ${
          classHover ? classes.hoverProduct : ""
        }`}
        onClick={openModalHandler}
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      >
        <div>
          <div className={classes.productHeader}>
            <div className={classes.img}>
              <img src={props.imageUrl} alt="product-coffee" />
            </div>
            <h3 className="title" style={{ margin: "0 10px" }}>
              {props.title}
            </h3>
            <div className={classes.describe}>{props.description}</div>
          </div>
          <div
            className={`${classes.productDesc} ${
              classHover ? classes.hoverPrice : ""
            }`}
          >
            <div className={`title ${classes.price}`}>
              {classHover ? "Add to cart" : `Rp. ${props.price}`}
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default ProductItem;
