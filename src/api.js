const BASE_URL = "http://localhost:8000/api";

// consuming products api
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
};

export const getSingleProduct = async (productId) => {
  const res = await fetch(`${BASE_URL}/products/${productId}`);
  return await res.json();
};

// export const getSingleProductImage = async (productId) => {
//   const res = await fetch(`${BASE_URL}/products/${productId}/image`);
//   console.log(res);
//   return await res.json();
// };

export const getSingleProductImage = (productId) =>
  `${BASE_URL}/products/${productId}/image`;

// consuming cart api
export const addToCart = async (productId) => {
  const formData = new FormData();
  formData.append("productId", productId);

  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const removeFromCart = async (productId) => {
  const formData = new FormData();
  formData.append("productId", productId);

  const res = await fetch(`${BASE_URL}/cart/remove`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const increaseQuantity = async (productId) => {
  const formData = new FormData();
  formData.append("productId", productId);

  const res = await fetch(`${BASE_URL}/cart/increase`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const decreaseQuantity = async (productId) => {
  const formData = new FormData();
  formData.append("productId", productId);

  const res = await fetch(`${BASE_URL}/cart/decrease`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`);
  return await res.json();
};

export const checkoutCart = async () => {
  const formData = new FormData();

  const res = await fetch(`${BASE_URL}/cart/checkout`, {
    method: "POST",
    body: formData,
  });
  return await res.json();
};

// consuming orders api

export const getAllOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  return await res.json();
};

export const getSingleOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`);
  return await res.json();
};
