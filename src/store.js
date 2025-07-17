import { configureStore } from '@reduxjs/toolkit'
import { membersApi } from './services/membersApi'

export const store = configureStore({
  reducer: {
    [membersApi.reducerPath]: membersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(membersApi.middleware),
})