import api from "./axios";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);

  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// import api from "./axios";
// import { setProducts, addProduct, updateProductState, removeProduct } from "../redux/slices/productSlice";
// export const getProducts = () => {
//     return async (dispatch) => {
//         try {
//             const response = await api.get("/products");

//             dispatch(setProducts(response.data.data));
//         } catch (error) {
//             console.error("Failed to fetch products:", error);
//         }
//     };
// };

// export const getProduct = (id) => {
//     return async (dispatch) => {
//         try {
//             const response = await api.get(`/products/${id}`);

//             return response.data.data;
//         } catch (error) {
//             console.error("Failed to fetch product:", error);
//         }
//     };
// };

// export const createProduct = (data) => {
//     return async (dispatch) => {
//         try {
//             const response = await api.post("/products", data);

//             dispatch(addProduct(response.data.data));
//         } catch (error) {
//             console.error("Failed to create product:", error);
//         }
//     };
// };

// export const updateProduct = (id, data) => {
//     return async (dispatch) => {
//         try {
//             const response = await api.put(`/products/${id}`, data);

//             dispatch(updateProductState(response.data.data));
//         } catch (error) {
//             console.error("Failed to update product:", error);
//         }
//     };
// };

// export const deleteProduct = (id) => {
//     return async (dispatch) => {
//         try {
//             await api.delete(`/products/${id}`);

//             dispatch(removeProduct(id));
//         } catch (error) {
//             console.error("Failed to delete product:", error);
//         }
//     };
// };
