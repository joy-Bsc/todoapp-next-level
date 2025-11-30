import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import type { ITodo , ICreateTodoInput ,IUpdateTodoInput } from "@/types/todo";

export const todosApi = createApi({
    reducerPath : "todosApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "/api",
        prepareHeaders : (headers , { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes : ["Todos"],
    endpoints : (builder) => ({
        getTodos : builder.query<ITodo[] , void>({
            query : () => ({
                url : "/todos",
                method : "GET",
            }),
            providesTags : ["Todos"],
        }),
        createTodo : builder.mutation<ITodo , ICreateTodoInput>({
            query : (body) => ({
                url : "/todos",
                method : "POST",
                body,
            }),
            invalidatesTags : ["Todos"],
        }),
        updateTodo : builder.mutation<ITodo , IUpdateTodoInput>({
            query : ({id, ...body}) => ({
                url : `/todos/${id}`,
                method : "PUT",
                body
            }),
            invalidatesTags : ["Todos"],
        }),
        deleteTodo : builder.mutation<{ success : boolean ; id : string } , string>({
            query : (id) => ({
                url : `/todos/${id}`,
                method : "DELETE",
            }),
            invalidatesTags : ["Todos"],
        }),
    }),
});
export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi;
