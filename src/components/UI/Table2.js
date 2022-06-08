import { Fragment } from "react";
import "./Table2.css";
import Image from "./Image";

const ContentProduct = ({ data }) => {
  const editClickHandler = (id) => {
    console.log(id);
  };
  const deleteClickHandler = (id) => {
    console.log(id);
  };

  return (
    <Fragment>
      {data.length !== 0 &&
        data.map((item) => (
          <tr key={item.id}>
            <td>
              <Image
                imageUrl={item.imageUrl}
                width="70px"
                height="70px"
                margin="10px auto"
              />
            </td>
            <td>{item.title}</td>
            <td>{item.type}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.isAvailable ? "Avilable" : "Not Avilable"}</td>
            <td>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <p className="link" onClick={editClickHandler}>
                  Edit
                </p>
                <p
                  className="link"
                  style={{ marginLeft: "0.5rem" }}
                  onClick={deleteClickHandler}
                >
                  Delete
                </p>
              </span>
            </td>
          </tr>
        ))}
      ;
    </Fragment>
  );
};

const Table2 = (props) => {
  const { theadName, data, tableFor } = props;

  return (
    <Fragment>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              {theadName.map((item) => (
                <th key={item}>{item}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ContentProduct data={data} />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table2;
