"use client";
import React, { useState } from "react";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const userData = await register(form).unwrap();
      dispatch(setCredentials(userData));
      router.push("/");
    } catch (err: any) {
      console.error("Failed to register: ", err);
      alert(err?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full border p-2"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full border p-2"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          className="w-full border p-2"
        />
        <button
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
