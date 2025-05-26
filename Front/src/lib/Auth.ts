import { createContext } from "react";
interface ProviderProps {
  user: string | null;
  token: string;
}
export const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
});
