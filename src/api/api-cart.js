import { domainUrl } from "../lib/domain-url";

export const addToCart = async (dataProduct) => {
  const response = await fetch(`${domainUrl}/shop/cart`, {
    method: "POST",
    body: JSON.stringify(dataProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Cannot add data to cart");
  }

  return null;
};

export const fetchCartByUser = async ({ userId }) => {
  const response = await fetch(`${domainUrl}/shop/cart-user`, {
    method: "POST",
    body: JSON.stringify({ userId: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Cannot add order");
  }

  const productInCart = [];

  const data = await response.json();
  const products = data.products;

  for (const key in products) {
    const newObj = {
      id: key,
      ...products[key],
    };
    productInCart.push(newObj);
  }

  return productInCart;
};

export const getEditCart = async (data) => {
  const response = await fetch(`${domainUrl}/shop/cart-get-edit`, {
    method: "POST",
    body: JSON.stringify({ cartId: data.cartId, productId: data.productId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Cannot add order");
  }

  const dataFetch = await response.json();

  const cartDataProduct = {
    cartId: dataFetch.dataCart.cartId,
    productId: dataFetch.dataCart.productId,
    quantity: dataFetch.dataCart.quantity,
    description: dataFetch.dataCart.description,
    pricePerItem: dataFetch.dataCart.pricePerItem,
    price: dataFetch.dataCart.price,
  };

  return cartDataProduct;
};

export const postEditProductCart = async (data) => {
  const response = await fetch(`${domainUrl}/shop/cart-edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId: data.cartId,
      productId: data.productId,
      quantity: data.quantity,
      description: data.description,
      pricePerItem: data.pricePerItem,
    }),
  });

  if (!response.ok) {
    throw new Error("Cannot edit product in cart");
  }

  return null;
};

export const deletedCart = async (data) => {
  const response = await fetch(`${domainUrl}/shop/cart-product-delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartId: data.cartId, productId: data.productId }),
  });

  if (!response.ok) {
    throw new Error("Cannot delete product cart!");
  }

  return null;
};

export const checkoutCart = async (data) => {
  const response = await fetch(`${domainUrl}/shop/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: data.userId,
      eat_by: data.data.eat_by,
      table_number: data.data.table_number,
      payment_method: data.data.payment_method,
    }),
  });

  if (!response.ok) {
    throw new Error("Cannot add order");
  }

  return null;
};
