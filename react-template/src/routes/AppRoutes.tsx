import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ProtectedRoute from "../auth/ProtectedRoute";

// Páginas
// import Login from "@/pages/Login";
// import Home from "@/pages/Home";
import NotFound from "../pages/NotFound";
import ServerError from "../pages/ServerError";
import FormDemo from "../pages/FormDemo";

function AppRoutes() {
  const { user } = useAuth();

  const publicRoutes = [
    // { path: "/login", element: <Login /> },
    { path: "/server_error", element: <ServerError /> },
    // { path: "/", element: <Home /> },
    { path: "/", element: <FormDemo /> }
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(user ? protectedRoutes : publicRoutes),
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
