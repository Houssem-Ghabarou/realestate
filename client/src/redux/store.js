// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";
// import { combineReducers } from "redux";
// import propertyReducer from "./slices/propertySlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["property.wishlist"],
// };
// const rootReducer = combineReducers({
//   property: propertyReducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);
