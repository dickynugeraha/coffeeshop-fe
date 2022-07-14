import { useEffect, useContext, useCallback } from "react";
import useHttp from "../../hooks/use-http";
import {
  getAllUsers,
  getFetchSingleUser,
  postUpdateUser,
  deleteUser,
} from "../../api/api-user";
import AvailableUser from "../../components/Users/AvailableUser";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ModalContext from "../../store/modal-context";

const GetAllUser = () => {
  const {
    data: users,
    sendingRequest: getAllUsersHandler,
    status,
    error,
  } = useHttp(getAllUsers, true);

  useEffect(() => {
    getAllUsersHandler();
  }, [getAllUsersHandler]);

  const userChange = useCallback(() => {
    getAllUsersHandler();
  }, [getAllUsersHandler]);

  return {
    users,
    statusGetAll: status,
    errorGetAll: error,
    userChange,
  };
};

const GetSingleUser = () => {
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
    user,
    statusSingle,
    getSingleUser,
    errorSingle,
  };
};

const PostEditUser = () => {
  const { status: statusEdit, sendingRequest: sendUpdateUser } = useHttp(
    postUpdateUser,
    true
  );

  const updateUser = (data) => {
    sendUpdateUser({
      id: data.id,
      name: data.name,
      newPassword: data.newPassword,
    });
  };

  return {
    statusEdit,
    updateUser,
  };
};

const DeleteUser = () => {
  const { status: statusDelete, sendingRequest: sendDeleteUser } = useHttp(
    deleteUser,
    true
  );

  const deleteUserHandler = (userId) => {
    console.log(userId);

    const isDeleteItem = window.confirm("Are you sure want to delete user?");
    if (isDeleteItem) {
      sendDeleteUser(userId);
    }
  };

  return {
    statusDelete,
    deleteUserHandler,
  };
};

const Users = () => {
  const modalCtx = useContext(ModalContext);

  const hiddenModalHandler = () => {
    modalCtx.hiddenModal();
  };

  const { users, statusGetAll, userChange } = GetAllUser();
  const { user, getSingleUser } = GetSingleUser();
  const { statusEdit, updateUser } = PostEditUser();
  const { statusDelete, deleteUserHandler } = DeleteUser();

  useEffect(() => {
    if (statusEdit === "completed" || statusDelete === "completed") {
      userChange();
    }
  }, [statusEdit, statusDelete, userChange]);

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
        onPostEdit={updateUser}
      />
    );
  }

  return (
    <div style={{ margin: "7rem auto" }}>
      <div className="action">
        <h2>USERS</h2>
      </div>
      <div style={{ padding: "5% 15%" }}>{content}</div>
    </div>
  );
};

export default Users;
