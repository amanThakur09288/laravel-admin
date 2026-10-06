// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     products: [],
// };

// const productSlice = createSlice({
//     name: "products",

//     initialState,

//     reducers: {
//         setProducts: (state, action) => {
//             state.products = action.payload;
//         },

//         addProduct: (state, action) => {
//             state.products.unshift(action.payload);
//         },

//         updateProduct: (state, action) => {
//             const updatedProduct = action.payload;

//             const index = state.products.findIndex(
//                 (product) => product.id === updatedProduct.id
//             );

//             if (index !== -1) {
//                 state.products[index] = updatedProduct;
//             }
//         },

//         removeProduct: (state, action) => {
//             state.products = state.products.filter(
//                 (product) => product.id !== action.payload
//             );
//         },
//     },
// });

// export const {
//     setProducts,
//     addProduct,
//     updateProduct,
//     removeProduct,
// } = productSlice.actions;

// export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    actionLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setActionLoading: (state, action) => {
            state.actionLoading = action.payload;
        },

        setProducts: (state, action) => {
            state.items = action.payload;
            state.error = null;
        },

        addProduct: (state, action) => {
            state.items.unshift(action.payload);
        },

        updateProductState: (state, action) => {
            const updatedProduct = action.payload;

            const index = state.items.findIndex(
                (product) =>
                    product.id === updatedProduct.id
            );

            if (index !== -1) {
                state.items[index] = updatedProduct;
            }
        },

        removeProduct: (state, action) => {
            state.items = state.items.filter(
                (product) =>
                    product.id !== action.payload
            );
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setActionLoading,
    setProducts,
    addProduct,
    updateProductState,
    removeProduct,
    setError,
    clearError,
} = productSlice.actions;

export default productSlice.reducer;