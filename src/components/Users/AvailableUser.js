import { Fragment } from "react";
import "../UI/Table2.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import TableItem from "./TableItem";
import EditUserForm from "./EditUserForm";
import Modal from "../UI/Modal";

const UsersTable = ({
  users,
  user,
  status,
  onEdit,
  onDelete,
  onHiddenModal,
  modalIsShow,
}) => {
  if (status === "pending") {
    return (
      <div className="action">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th className="title">Name</th>
            <th className="title">Email</th>
            <th className="title">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <TableItem
              key={item.id}
              user={{ id: item.id, name: item.name, email: item.email }}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      {modalIsShow && user.length !== 0 && (
        <EditUserForm onHiddenModal={onHiddenModal} user={user} />
      )}
    </div>
  );
};

export default UsersTable;
