import { combineReducers } from "redux";
import loginReducer from "./login-reducer";

const allReducers = combineReducers({
  userDetails: loginReducer,
});

export default allReducers;
