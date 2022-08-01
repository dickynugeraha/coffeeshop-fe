import { domainUrl } from "../lib/domain-url";

export const getOrderByStatus = async (status) => {
  const response = await fetch(
    `${domainUrl}/admin/get-filter-orders/${status}`
  );

  if (!response.ok) {
    throw new Error("cannot fetch orders");
  }

  const data = await response.json();

  return data.orders;
};

export const getDetailOrder = async (detail) => {
  const response = await fetch(`${domainUrl}/admin/get-detail-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: detail.userId, orderId: detail.orderId }),
  });

  if (!response.ok) {
    throw new Error("Cannot get detail order, something wrong");
  }

  const data = await response.json();

  return data;
};

export const editStatusOrder = async (dataOrder) => {
  const response = await fetch(`${domainUrl}/admin/edit-status-order`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: dataOrder.orderId,
      status: dataOrder.status,
    }),
  });

  if (!response.ok) {
    throw new Error("Cannot edit status order");
  }

  return null;
};

export const getOrderByDate = async (date) => {
  const response = await fetch(`${domainUrl}/admin/get-orders-date`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start: date.start,
      end: date.end,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Cannot edit status order");
  }

  return data.orders;
};
