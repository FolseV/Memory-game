// import {} from "redux"

// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { resultsTable } from "./middleware/resultsTable";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(resultsTable, thunk))
);
