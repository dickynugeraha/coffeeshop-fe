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
