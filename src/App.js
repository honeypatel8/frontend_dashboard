import "./App.css";
import Greeting from "./components/Greeting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import StatsPage from "./pages/StatsPage";
import { useRoutes } from "react-router-dom";
import Profile from "./pages/Profile";
import { RequireAuth, RequireAdmin } from "./contextApi/store";
import Dashboard from "./pages/Dashboard";

export const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
      children: [
        {
          index: true,
          element: <Greeting />,
        },
        {
          path: "/stats",
          element: <StatsPage />,
        },
        {
          path: "/profile",
          element: (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: "*",
      element: <h1 className="text-center text-2xl">404 Page not found!</h1>,
    },
  ]);

  return routes;
};
