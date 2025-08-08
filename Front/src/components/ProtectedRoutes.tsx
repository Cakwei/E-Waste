import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { token, loading } = useAuth();

  return !loading ? token ? <Outlet /> : <Navigate to="/login" replace /> : "";
}
