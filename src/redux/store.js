import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import themeReducer from "./slices/themeSlice";
import batchReducer from "./slices/batchSlice";
import contactMessageReducer from "./slices/contactMessageSlice";
import courseReducer from "./slices/courseSlice";
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice";
import quizReducer from "./slices/quizSlice";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
    batches: batchReducer,
    contactMessages: contactMessageReducer,
    courses: courseReducer,
    auth: authReducer,
    services: serviceReducer,
    quiz: quizReducer,
    question: questionReducer,
  },
});
