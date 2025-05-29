import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface LoginType {
  username: string;
  password: string;
}

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

  const login = async (data: LoginType) => {
    try {
      const url =
        import.meta.env.VITE_DEPLOYMENT_MODE === "prod"
          ? "https://wms.cakwei.com"
          : "http://localhost:3000";
      const result = await axios.post(`${url}/login`, {
        username: data.username,
        password: data.password,
      });
      setUser(data.username);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
