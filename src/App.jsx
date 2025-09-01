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
import RequireAuth from "./Component/RequireAuth";
import GuestRoute from "./Component/GuestRoute";
import Verify from "./Pages/Verify";
import ContentManagement from "./Pages/Admin/ContentManagement";
import About from "./Pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/members" element={<MembersDirectory />} />
        <Route path="/about" element={<About />} />

        {/* Guest-only routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/verify/:id/:code"
          element={
            <GuestRoute>
              <Verify />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password/:id/:code"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth role="member">
              <AuthenticatedLayout />
            </RequireAuth>
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="institution" element={<MyInstitution />} />
          <Route path="finacials" element={<Finacials />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="support" element={<Support />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            <RequireAuth role="admin">
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="memberships" element={<MembershipApplications />} />
          <Route path="institutions" element={<InstitutionManagemment />} />
          <Route path="financials" element={<AdminFinacials />} />
          <Route path="reports" element={<ReportAndAnalitics />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
