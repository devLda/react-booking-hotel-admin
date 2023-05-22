import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./user/userSlice";
import LPSlice from "./loaiphong/LPSlice";
import DPSlice from "./datphong/DPSlice";
import phongSlice from "./phong/phongSlice";

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
    loaiphong: LPSlice,
    phong: phongSlice,
    datphong: DPSlice,
  },
});

export const persistor = persistStore(store);
