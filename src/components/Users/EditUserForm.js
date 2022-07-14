import { useId, useState } from "react";
import Modal from "../UI/Modal";

const EditUserForm = (props) => {
  const { user } = props;
  const id = useId();

  const [nameEntered, setNameEntered] = useState(user.name);
  const [newPasswordEntered, setNewPasswordEntered] = useState("");

  const submitEditHandler = (e) => {
    e.preventDefault();

    props.onPostEdit({
      id: user.id,
      name: nameEntered,
      newPassword: newPasswordEntered,
    });

    props.onHiddenModal();
  };
  return (
    <Modal onHiddenModal={props.onHiddenModal} forComponent="product">
      <div style={{ padding: "2rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            textTransform: "uppercase",
          }}
        >
          Edit User
        </h2>
        <form onSubmit={submitEditHandler}>
          <div className="form-control">
            <label htmlFor={"email" + id}>Email</label>
            <input type="email" id={"email" + id} value={user.email} disabled />
          </div>
          <div className="form-control">
            <label htmlFor={"name" + id}>Name</label>
            <input
              required
              type="text"
              id={"name" + id}
              onChange={(e) => setNameEntered(e.target.value)}
              value={nameEntered}
            />
          </div>
          <div className="form-control">
            <label htmlFor={"newPass" + id}>New Password</label>
            <input
              required
              type="password"
              id={"newPass" + id}
              onChange={(e) => setNewPasswordEntered(e.target.value)}
            />
          </div>
          <div className="form-control">
            <div className={`action`} style={{ marginTop: "1.2rem" }}>
              <button type="sumbit">Edit User</button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserForm;
