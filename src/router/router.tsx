import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/DashbaordHome/DashboardHome";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../layout/ProtectedRoute";
import Client from "../pages/Client/Client";
import Project from "../pages/Project/Project";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "clients",
        element: <Client />,
      },
      {
        path: "projects",
        element: <Project />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
