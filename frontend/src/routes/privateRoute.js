import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/actions/index";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken") ?? "";
  if (accessToken !== "") dispatch(loginAction(accessToken));

  return accessToken !== "" ? children : <Navigate to="/login" replace />;
};

export default AuthCheck;
