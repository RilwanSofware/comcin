import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar hidden on mobile */}
      <aside className="hidden md:block">
        <AdminSidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden ">
        <AdminTopbar />
        <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
