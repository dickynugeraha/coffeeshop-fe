import { useRef } from "react";
import "./OrderSuccess.css";

const FilterOrder = (props) => {
  const filter_start = useRef();
  const filter_end = useRef();

  const filterOrderHandler = () => {
    const filterStartValue = filter_start.current.value;
    const filterEndValue = filter_end.current.value;

    if (
      filterStartValue.trim().length === 0 ||
      filterEndValue.trim().length === 0
    ) {
      return alert("Please input correct date!");
    }

    props.onFilterOrder({
      start: filterStartValue,
      end: filterEndValue,
    });
  };

  return (
    <div className="order-success">
      <div className="start-filter">
        <h5 className="title">Start</h5>
        <input
          type="date"
          name="filter_start"
          className="date"
          ref={filter_start}
        />
      </div>
      <div className="end-filter">
        <h5 className="title">End</h5>
        <input
          type="date"
          name="filter_start"
          className="date"
          ref={filter_end}
        />
      </div>
      <div className="action-filter">
        <button className="title" onClick={filterOrderHandler}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterOrder;
