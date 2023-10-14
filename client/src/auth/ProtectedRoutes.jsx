import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoutes() {
  const { user } = useAuthContext();
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/login" />;
}
