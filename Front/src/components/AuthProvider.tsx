import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

type LoginType = {
  username: string;
  password: string;
  remember_me?: boolean | undefined;
};

interface ProviderProps {
  user: string | null;
  token: string;
  login(data: LoginType): void;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const [user, setUser] = useState<string | null>(storedInfo?.username);
  const [token, setToken] = useState(storedInfo?.token || "");
  const navigate = useNavigate();

  const login = (data: LoginType) => {
    setUser(data.username);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
