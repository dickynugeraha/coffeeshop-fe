import { domainUrl } from "../lib/domain-url";

export const getOrderByStatus = async (status) => {
  console.log(status);
  const response = await fetch(`${domainUrl}/admin/get-filter-orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ statusFilter: status }),
  });

  if (!response.ok) {
    throw new Error("cannot fetch orders");
  }

  const data = await response.json();

  return data.orders;
};
