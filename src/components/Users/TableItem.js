import { Fragment, useContext } from "react";
import ModalContext from "../../store/modal-context";

const TableItem = ({ user, onEdit, onDelete }) => {
  const modalCtx = useContext(ModalContext);

  const editButtonClick = () => {
    onEdit(user.id);
    modalCtx.showModal();
  };

  return (
    <tr key={user.id}>
      <Fragment>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <p className="link" onClick={editButtonClick}>
              Edit
            </p>
            <p
              className="link"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onDelete(user.id)}
            >
              Delete
            </p>
          </span>
        </td>
      </Fragment>
    </tr>
  );
};

export default TableItem;
