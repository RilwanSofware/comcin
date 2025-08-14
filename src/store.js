import { configureStore } from "@reduxjs/toolkit";
import { membersApi } from "./services/membersApi";
import { authApi } from "./services/auth";
import { adminDashboardApi } from "./services/admin-dashboard/dashboard";
import { memberDashboardApi } from "./services/members/dashboardmember";

export const store = configureStore({
  reducer: {
    [membersApi.reducerPath]: membersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,
    [memberDashboardApi.reducerPath]: memberDashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      membersApi.middleware,
      authApi.middleware,
      adminDashboardApi.middleware,
      memberDashboardApi.middleware
    ),
});
