import { Fragment } from "react";
import "../UI/Table2.css";

const OrderTable = ({ props }) => {
  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            {props.theadName?.map((item) => (
              <th className="title" key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default OrderTable;
