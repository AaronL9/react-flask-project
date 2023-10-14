import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoutes() {
  const { user } = useAuthContext();

  return user ? <Navigate to='/' /> : <Outlet />;
}
