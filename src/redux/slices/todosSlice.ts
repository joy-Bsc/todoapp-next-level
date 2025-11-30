import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "@/types/todo";

interface TodosState {
    todos: ITodo[],
    loading: boolean,
    error: string | null,
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
            state.loading = false;
            state.error = null;
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;