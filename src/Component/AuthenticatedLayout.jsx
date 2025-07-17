import React from "react";
import AuthenticatedHeader from "./AuthenticatedHeader";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="pt-6">
        {" "}
        <AuthenticatedHeader />
      </div>
      <main>
        {" "}
        <Outlet />{" "}
      </main>
    </div>
  );
}
