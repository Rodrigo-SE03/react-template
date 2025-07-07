import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import AppLayout from "./AppLayout";

// Páginas
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ServerError from "../pages/ServerError";
import FormDemo from "../pages/FormDemo";
import TablePage from "../pages/TablePage";
import Login from "../pages/Login";

function AppRoutes() {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <ProtectedRoute /> : <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/form", element: <FormDemo /> },
        { path: "/tabela", element: <TablePage /> },
        { path: "/login", element: <Login /> },
      ],
    },
    { path: "/server_error", element: <ServerError /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
