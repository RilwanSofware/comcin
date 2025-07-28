import AdminUsersTable from "@/Component/Admin/AdminUser/AdminUsersTable";
import InstitutionStatCard from "@/Component/Admin/Institutions/InstitutionStatCard";
import InstitutionTable from "@/Component/Admin/Institutions/InstitutionTable";
import MembershipTable from "@/Component/Admin/Membership/MembershipTable";
import MemberStatCard from "@/Component/Admin/Membership/MemberStatCard";
import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { LuArrowDownToLine } from "react-icons/lu";
import { useState } from "react";
import CreateUserModal from "@/Component/Admin/AdminUser/CreateUserModal";

export default function AdminUsers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Admin Users
          </h1>
          <p className="text-sm text-gray-500">
            Manage platform administrators and their access levels.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 bg-[#0A8625] hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
        >
          <HiOutlinePlusCircle /> Create Admin
        </button>
      </div>
      <AdminUsersTable />

      {showModal && <CreateUserModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
