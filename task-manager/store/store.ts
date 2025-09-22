
// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "@/services/taskApi";
import { userApi } from "@/services/userApi";

const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([taskApi.middleware, userApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
