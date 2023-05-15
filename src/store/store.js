import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./user/userSlice";

const commonConfig = {
  storage,
};

const userConfig = {
  ...commonConfig,
  key: "admin/login",
  whitelist: ["isLoggedIn", "current", "token"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice),
  },
});

export const persistor = persistStore(store);
