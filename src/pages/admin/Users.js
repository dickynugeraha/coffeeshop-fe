import { useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import { getAllUsers, getFetchSingleUser } from "../../api/api-user";
import AvailableUser from "../../components/Users/AvailableUser";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ModalContext from "../../store/modal-context";
import EditUserForm from "../../components/Users/EditUserForm";

const AllUser = () => {
  const {
    data: users,
    sendingRequest: getAllUsersHandler,
    status,
    error,
  } = useHttp(getAllUsers, true);

  useEffect(() => {
    getAllUsersHandler();
  }, [getAllUsersHandler]);

  return {
    users: users,
    statusGetAll: status,
    errorGetAll: error,
  };
};

const SingleUser = () => {
  const {
    data: user,
    sendingRequest: sendSingleUser,
    status: statusSingle,
    error: errorSingle,
  } = useHttp(getFetchSingleUser, true);

  const getSingleUser = (userId) => {
    sendSingleUser(userId);
  };

  return {
    user: user,
    statusSingle: statusSingle,
    getSingleUser,
    errorSingle: errorSingle,
  };
};

const Users = () => {
  const modalCtx = useContext(ModalContext);

  const hiddenModalHandler = () => {
    modalCtx.hiddenModal();
  };

  const { users, statusGetAll } = AllUser();
  const { user, getSingleUser } = SingleUser(modalCtx);

  const deleteUserHandler = (userId) => {};

  let content;
  if (statusGetAll === "pending") {
    content = (
      <div className="action">
        <LoadingSpinner />
      </div>
    );
  }
  if (statusGetAll === "completed") {
    content = (
      <AvailableUser
        users={users}
        user={user}
        onDelete={deleteUserHandler}
        onEdit={getSingleUser}
        modalIsShow={modalCtx.isShow}
        onHiddenModal={hiddenModalHandler}
      />
    );
  }

  return (
    <div style={{ margin: "7rem auto" }}>
      <div style={{ padding: "5% 9%" }}>{content}</div>
    </div>
  );
};

export default Users;
