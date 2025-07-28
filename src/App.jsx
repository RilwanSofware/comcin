import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetail from "./Pages/NewsDetail";
import Contact from "./Pages/Contact";
import MembersDirectory from "./Pages/MembersDirectory";
import News from "./Pages/News";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/Forgotpassword";
import ResetPassword from "./Pages/ResetPassword";
import AuthenticatedLayout from "./Component/AuthenticatedLayout";
import MemberDashboard from "./Pages/MemberDashboard";
import MyInstitution from "./Pages/MyInstitution";
import Finacials from "./Pages/Finacials";
import Certificates from "./Pages/Certificates";
import Support from "./Pages/Support";
import AdminLayout from "./Component/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import MembershipApplications from "./Pages/Admin/MembershipApplications";
import InstitutionManagemment from "./Pages/Admin/InstitutionManagemment";
import AdminUsers from "./Pages/Admin/AdminUsers";
import Settings from "./Pages/Admin/Settings";
import AdminFinacials from "./Pages/Admin/AdminFinacials";
import ReportAndAnalitics from "./Pages/Admin/ReportAndAnalitics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/members" element={<MembersDirectory />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<AuthenticatedLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="institution" element={<MyInstitution />} />
          <Route path="finacials" element={<Finacials />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="support" element={<Support />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="memberships" element={<MembershipApplications />} />
          <Route path="institutions" element={<InstitutionManagemment />} />
          <Route path="financials" element={<AdminFinacials />} />
          <Route path="reports" element={<ReportAndAnalitics />} />
          <Route path="content" element={<MembershipApplications />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<Settings />} />

       
        </Route>
      </Routes>
    </Router>
  );
}
