import classes from "./ProductFilter.module.css";

const ProductFilter = (props) => {
  const changeTypeProductHandler = (event) => {
    props.onChangeTypeProduct(event.target.value);
  };

  return (
    <div className={classes.filter}>
      <div>
        <label className="title" htmlFor="filterTypeProduct">
          Filter
        </label>
      </div>
      <div className={classes.box}>
        <select
          onChange={changeTypeProductHandler}
          value={props.defaultTypeSelected}
        >
          <option value="all">All</option>
          <option value="Dissert">Dissert</option>
          <option value="Coffee">Coffee</option>
          <option value="Main Course">Main Course</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
