import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice"
import blogReducer from "../slices/blog/blogSlice"
import editorReducer from "../slices/editor/editorSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        editor: editorReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store
