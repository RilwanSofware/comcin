import { configureStore } from '@reduxjs/toolkit'
import { membersApi } from './services/membersApi'
import { authApi } from './services/auth'

export const store = configureStore({
  reducer: {
    [membersApi.reducerPath]: membersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      membersApi.middleware,
      authApi.middleware),
})