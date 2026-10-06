import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import themeReducer from "./slices/themeSlice";
export const store = configureStore({
    reducer: {
        products: productReducer,
        theme: themeReducer,
    },
});