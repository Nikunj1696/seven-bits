import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";

// ** init middleware
const middleware = [thunk];

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create store
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

