import DashboardStats from "@/Component/Admin/DashboardStats";
import RecentApplications from "@/Component/Admin/RecentApplications";
import PaymentOverview from "@/Component/Admin/PaymentOverview";
import InstitutionStatus from "@/Component/Admin/InstitutionStatus";
import RecentActivity from "@/Component/Admin/RecentActivity";
import { LuArrowDownToLine } from "react-icons/lu";
import { useGetDashboardQuery } from "@/services/admin-dashboard/dashboard";
import Loader from "@/Component/Loader";


export default function AdminDashboard() {
  const { data: dashboard, isLoading } = useGetDashboardQuery();


  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, here’s what’s happening with COMCIN today.
          </p>
        </div>
        <button className="flex items-center bg-[#0A8625] hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
          <LuArrowDownToLine /> Export Report
        </button>
      </div>

      <DashboardStats cardsStat={dashboard?.data} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RecentApplications recent={dashboard?.data?.recent} />
          <PaymentOverview transactions={dashboard?.data?.recent} />
        </div>
        <div className="space-y-6">
          <InstitutionStatus status={dashboard?.data?.status_percentages} statusValue={dashboard?.data?.totals} />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
