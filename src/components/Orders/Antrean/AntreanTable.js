import { Fragment } from "react";
import "../../UI/Table2.css";

const AntreanTable = (props) => {
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
            <th className="title">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item) => (
            <tr>
              <Fragment>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
              </Fragment>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AntreanTable;
