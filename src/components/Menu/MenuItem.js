import { useContext, Fragment } from "react";
import Image from "../UI/Image";
import ModalContext from "../../store/modal-context";

const MenuItem = (props) => {
  const modalCtx = useContext(ModalContext);

  const editClickHandler = () => {
    modalCtx.showModal();
    props.onEdit(props.id);
  };
  const deleteClickHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <tr>
      <Fragment>
        <td>
          <Image
            imageUrl={props.imageUrl}
            width="70px"
            height="70px"
            margin="10px auto"
          />
        </td>
        <td>{props.title}</td>
        <td>{props.type}</td>
        <td>{props.price}</td>
        <td>{props.description}</td>
        <td>{props.isAvailable ? "Avilable" : "Not Avilable"}</td>
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
      </Fragment>
    </tr>
  );
};

export default MenuItem;
