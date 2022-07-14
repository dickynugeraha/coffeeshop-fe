import { useState } from "react";
import "../UI/Table2.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import MenuItem from "./MenuItem";
import FormAdd from "./FormAdd";
import FormEdit from "./FormEdit";

const AvailableMenu = (props) => {
  const [showFormAdd, setShowFormAdd] = useState(false);
  const theadName = ["Image", "Title", "Type", "Price", "Description", "Stock"];

  let content;
  if (props.status === "pending") {
    content = (
      <div className="action">
        <LoadingSpinner />
      </div>
    );
  } else if (props.status === "completed") {
    content = (
      <table className="fl-table">
        <thead>
          <tr>
            {theadName.map((item) => (
              <th className="title" key={item}>
                {item}
              </th>
            ))}
            <th className="title">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.allProduct.length !== 0 &&
            props.allProduct.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type}
                imageUrl={item.imageUrl}
                price={item.price}
                description={item.description}
                isAvailable={item.isAvailable}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
              />
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <div style={{ margin: "3rem auto" }}>
      {props.modalIsShow && props.singleProd.length !== 0 && (
        <FormEdit
          singleProd={props.singleProd}
          onPostEdit={props.onPostEdit}
          onHiddenModal={props.onHiddenModal}
        />
      )}
      {showFormAdd && (
        <FormAdd
          onPostAdd={props.onPostAdd}
          onCloseForm={() => setShowFormAdd(false)}
        />
      )}
      <div className="action">
        <h2>MENU</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          style={{ marginBottom: "2rem" }}
          className="link"
          onClick={() => setShowFormAdd((prevState) => !prevState)}
        >
          Add menu
        </p>
      </div>
      <div className="table-wrapper">{content}</div>
    </div>
  );
};

export default AvailableMenu;
