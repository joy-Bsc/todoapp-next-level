import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState,IAuthResponse } from "@/types/auth";

interface AuthState{
    token: string | null;
    user: IAuthState | null;
}

const getInitialToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
};

const getInitialUser = () => {
    if (typeof window === "undefined") return null;
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
};

const initialState: AuthState = {
    token: getInitialToken(),
    user: getInitialUser(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem("token", action.payload.token);
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                } catch (e) {
                    // ignore localStorage write errors
                }
            }
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            if (typeof window !== "undefined") {
                try {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                } catch (e) {
                    // ignore
                }
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;