export const registerUserApi = "https://luxuryhub.herokuapp.com/api/auth/register";

export const loginUserApi = "https://luxuryhub.herokuapp.com/api/auth/login";

export const logoutUser = "https://luxuryhub.herokuapp.com/api/auth/logout";

export const forgotUserApi = `https://luxuryhub.herokuapp.com/api/auth/forgotpassword`;

export const resetTokenVerifyApi = `https://luxuryhub.herokuapp.com/api/auth/reset_token_verify`;

export const resetPasswordApi = `https://luxuryhub.herokuapp.com/api/auth/reset_password`; //--------

export const updateUserApi = "https://luxuryhub.herokuapp.com/api/user/update/";

export const avatarUrlLink = "https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6";

export const cartFind = "https://luxuryhub.herokuapp.com/api/cart/find";

export const cartClearApi = "https://luxuryhub.herokuapp.com/api/cart/clear";

export const cartCreateApi = "https://luxuryhub.herokuapp.com/api/cart/create";

export const orderCreateApi = "https://luxuryhub.herokuapp.com/api/order/create";

export const orderFindApi = "https://luxuryhub.herokuapp.com/api/order/find";

export const getAllProductsApi = "https://luxuryhub.herokuapp.com/api/product";

export const getProductByIdApi = (productId) => `https://luxuryhub.herokuapp.com/api/product/find/${productId}`;

export const getCategorizeProductApi = (category) => `https://luxuryhub.herokuapp.com/api/product?category=${category}`;

export const getOrderByIdApi = (orderId) => `https://luxuryhub.herokuapp.com/api/order/find/${orderId}`;

export const deleteOrderByIdApi = (orderId) => `https://luxuryhub.herokuapp.com/api/order/cancel/${orderId}`;

export const updateOrderByIdApi = (orderId) => `https://luxuryhub.herokuapp.com/api/order/update/${orderId}`;

// https://luxuryhub.herokuapp.com