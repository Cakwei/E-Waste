import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface ILogin {
  username: string;
  password: string;
}
interface IRegister {
  username: string;
  email: string;
  password: string;
}
export interface ProviderProps {
  user: string | null;
  token: string;
  login(data: ILogin): void;
  logout(e: React.FormEvent): void;
  register(data: IRegister): void;
}

const url =
  import.meta.env.VITE_DEPLOYMENT_MODE === "prod"
    ? "https://wms.cakwei.com"
    : "http://localhost:3000";

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const [user, setUser] = useState<string | null>(storedInfo?.username);
  // const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(storedInfo?.token || "");
  const navigate = useNavigate();

  async function RefreshSession() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await axios.post(`${url}/token`, { token });
        if (result.data.result === true) {
          setToken(result.data.token);
        }
      }
    } catch (err) {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  useEffect(() => {
    RefreshSession();
  }, []);

  const login = async (data: ILogin) => {
    try {
      const result = await axios.post(`${url}/login`, {
        username: data.username,
        password: data.password,
      });
      if (result.data.result === true) {
        setUser(data.username);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await axios.post(`${url}/logout`, {});
    if (result.status === 200) {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const register = async (data: IRegister) => {
    try {
      console.log(data);
      const result = await axios.post(`${url}/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (result.data.result === true) {
        alert("Successfully registered. Please login.");
        navigate("/login");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
