import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ILoginInput, IRegisterInput, IAuthResponse } from "@/types/auth";
import { RootState } from "../store/store";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<IAuthResponse, IRegisterInput>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<IAuthResponse, ILoginInput>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        getMe: builder.query<IAuthResponse, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;