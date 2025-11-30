import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { todosApi } from "../api/todosApi";
import authReducer from "../slices/authSlice";
import todosReducer from "../slices/todosSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
        [authApi.reducerPath]: authApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;