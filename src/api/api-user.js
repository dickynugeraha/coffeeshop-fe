import { domainUrl } from "../lib/domain-url";

export const getAllUsers = async () => {
  const response = await fetch(`${domainUrl}/admin/users`);

  if (!response.ok) {
    throw new Error("Cannot fetch all users");
  }

  const data = await response.json();

  return data.users;
};

export const getFetchSingleUser = async (userId) => {
  const response = await fetch(`${domainUrl}/admin/get-edit-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Cannot fetch all users");
  }

  const data = await response.json();

  return data.user;
};

export const postUpdateUser = async (dataUser) => {
  const response = await fetch(`${domainUrl}/admin/update-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: dataUser.id,
      name: dataUser.name,
      newPassword: dataUser.newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Cannot update users");
  }

  return null;
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${domainUrl}/admin/delete-user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });

  if (!response.ok) {
    throw new Error("Cannot update users");
  }

  return null;
};
