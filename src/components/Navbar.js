import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthConsumer, ReduxConsumer } from "../contextApi/store";
import { logoutUser } from "../apis/logoutUser";
import { useLogoutUserMutation } from "../features/api/user";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";

const Navbar = () => {
  const { user, role } = ReduxConsumer();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const result = await logoutUser();
      console.log(result.data.message);
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-3   fixed w-full top-0 shodow shadow-md  ">
      <div className=" flex flex-1 space-x-4  items-center ">
        {user && (
          <>
            <NavLink
              className="px-1 py-1 rounded-md text-white grid place-items-center"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "white",
                  background: isActive ? "rgb(79 70 229 / 1" : "",
                  borderRadius: isActive ? "20%" : "",
                };
              }}
              to="/"
            >
              <img
                src="https://seeklogo.com/images/F/For_Dummies-logo-270963AFD1-seeklogo.com.png"
                className="h-[40px] w-[40px]"
                alt="dg"
              />
            </NavLink>
            <NavLink
              className="px-3 py-1  h-10 rounded-md text-black grid place-content-center"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  background: isActive ? "rgb(79 70 229 / 1" : "",
                };
              }}
              to="/stats"
            >
              Stats
            </NavLink>

            <NavLink
              className="px-3 py-1  h-10 rounded-md text-black grid place-content-center"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  background: isActive ? "rgb(79 70 229 / 1" : "",
                };
              }}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </>
        )}
        {!user && (
          <>
            <NavLink
              className="px-3 py-1 rounded-md text-black"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  background: isActive ? "rgb(79 70 229 / 1" : "",
                };
              }}
              to="/signin"
            >
              Login
            </NavLink>
            <NavLink
              className="px-3 py-1 rounded-md text-black"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  background: isActive ? "rgb(79 70 229 / 1" : "",
                };
              }}
              to="/signup"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
      <div className="flex justify-center items-center space-x-4 text-gray-400">
        {user && (
          <>
            <button
              onClick={Logout}
              className="flex h-10 w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log Out
            </button>
            <NavLink
              className="px-3 w-[43px] h-[43px] rounded-full text-gray-400 flex flex-col justify-center items-center"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "rgb(156 163 175 / 1)",
                  // background: isActive ? "white" : " rgb(31 41 55 / 1",
                  border: isActive ? "2px solid white" : "transparent",
                };
              }}
              to="/profile"
            >
              <span className="flex w-10 h-10 rounded-full justify-center items-center bg-blue-300 text-black ">
                {`${user.firstName.charAt(0).toUpperCase()} ${user.lastName
                  .charAt(0)
                  .toUpperCase()}`}
              </span>
              {/* Profile */}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
