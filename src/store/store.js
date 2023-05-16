import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./user/userSlice";
import LPSlice from "./loaiphong/userSlice";

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
    loaiphong: LPSlice
  },
});

export const persistor = persistStore(store);
