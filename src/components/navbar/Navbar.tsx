"use client";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { logout } from "@/redux/slices/authSlice";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white p-4 shadow">
      <div className="max-w-4xl mx-auto flex justify-between">
        <div className="font-bold">My Todos</div>
        <div className="space-x-4">
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <span>{user.name || user.email}</span>
              <button
                onClick={() => dispatch(logout())}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
