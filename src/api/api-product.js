import { domainUrl } from "../lib/domain-url";

export const getProducts = async () => {
  const response = await fetch(`${domainUrl}/admin/products`);
  const data = await response.json();

  const products = data.products;

  const dataProducts = [];

  for (const key in products) {
    const dataObj = {
      id: key,
      ...products[key],
    };
    dataProducts.push(dataObj);
  }

  return dataProducts;
};

export const addNewProduct = async (dataProduct) => {
  const formData = new FormData();
  formData.append("title", dataProduct.title);
  formData.append("price", dataProduct.price);
  formData.append("description", dataProduct.description);
  formData.append("type", dataProduct.type);
  formData.append("image", dataProduct.img);

  const response = await fetch(`${domainUrl}/admin/product`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cannot add new product");
  }

  return null;
};

export const productGetEdit = async (productId) => {
  const response = await fetch(`${domainUrl}/admin/product-edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Cannot add new product");
  }

  const singleProduct = {
    id: data.product.id,
    title: data.product.title,
    type: data.product.type,
    price: data.product.price,
    stock: data.product.isAvailable,
    description: data.product.description,
    imageUrl: data.product.imageUrl,
  };

  return singleProduct;
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${domainUrl}/admin/delete-product`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: productId }),
  });

  if (!response.ok) {
    throw new Error("Cannot delete product");
  }

  return null;
};

export const updatePostProduct = async (dataProduct) => {
  const formData = new FormData();
  formData.append("id", dataProduct.id);
  formData.append("title", dataProduct.title);
  formData.append("price", dataProduct.price);
  formData.append("description", dataProduct.description);
  formData.append("isAvailable", dataProduct.isAvailable);
  formData.append("type", dataProduct.type);
  formData.append("image", dataProduct.img);

  const response = await fetch(`${domainUrl}/admin/update-product`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cannot edit product");
  }

  return null;
};
