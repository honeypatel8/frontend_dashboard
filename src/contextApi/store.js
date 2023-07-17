import { createContext, useContext, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

export const ReduxConsumer = () => {
  return useSelector((state) => state.user);
};

export const RequireAuth = ({ children }) => {
  // const { activeUser, dispatch } = AuthConsumer();
  const { user } = ReduxConsumer();

  const location = useLocation();

  // const role = activeUser?.user?.roleId;
  const role = user?.roleId;

  return role === 1 || role === 2 ? (
    children
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathName }} />
  );
};
