"use client";
import React, { useState, useEffect } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/redux/api/todosApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setTodos, addTodo } from "@/redux/slices/todosSlice";
import { useRouter } from "next/navigation";

const DashBoardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth);
  const {
    data: todosData,
    isLoading,
    isError,
  } = useGetTodosQuery(undefined, { skip: !user?.token });
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [newTodoText, setNewTodoText] = useState("");
  useEffect(() => {
    if (!user?.token) {
      router.push("/login");
    }
  }, [user, router]);
  useEffect(() => {
    if (todosData) {
      // backend may return { success: true, todos: [...] } or raw array
      const fetched = Array.isArray(todosData)
        ? todosData
        : (todosData as any)?.todos ?? [];
      dispatch(setTodos(fetched));
    }
  }, [todosData, dispatch]);

  const todos = useSelector((state: RootState) => state.todos.todos);

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (newTodoText.trim()) {
      try {
        const res = await createTodo({ title: newTodoText }).unwrap();
        const created = (res as any)?.todo ?? res;
        dispatch(addTodo(created));
        setNewTodoText("");
      } catch (err) {
        console.error("Failed to add todo: ", err);
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todos</h1>
        <div>{(user as any)?.email ?? "Guest"} </div>
      </header>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="flex-1 border p-2"
          placeholder="New todo"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-red-600">Error loading todos</div>}

      <ul className="space-y-2">
        {todos.map((t: any) => (
          <li
            key={t._id}
            className="flex items-center gap-3 border p-2 rounded"
          >
            <label className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() =>
                  updateTodo({ id: t._id, completed: !t.completed })
                }
                aria-label={`Toggle ${t.title}`}
                title={`Toggle ${t.title}`}
              />
              <span className={t.completed ? "line-through flex-1" : "flex-1"}>
                {t.title}
              </span>
            </label>
            <button onClick={() => deleteTodo(t._id)} className="text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoardPage;
