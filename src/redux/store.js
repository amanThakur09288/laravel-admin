import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import themeReducer from "./slices/themeSlice";
import batchReducer from "./slices/batchSlice";
import contactMessageReducer from "./slices/contactMessageSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
    batches: batchReducer,
    contactMessages: contactMessageReducer,
  },
});
