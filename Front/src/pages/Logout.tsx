import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";

export default function Logout() {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  }, []);

  return <div></div>;
}
