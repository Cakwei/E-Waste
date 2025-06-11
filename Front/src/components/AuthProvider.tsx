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
  user: { username: string; email: string } | null;
  token: string;
  loading: boolean;
  login(data: ILogin): void;
  logout(e: React.FormEvent): void;
  register(data: IRegister): void;
}

export const url =
  import.meta.env.VITE_DEPLOYMENT_MODE === "prod"
    ? "https://wms-api.cakwei.com"
    : "http://localhost:3000";

const AuthContext = createContext<ProviderProps>({
  user: { username: "", email: "" },
  token: "",
  loading: true,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function RefreshSession() {
    try {
      setLoading(true);

      const result = await axios.post(
        `${url}/token`,
        {},
        {
          withCredentials: true,
        },
      );
      if (result.data.result === true) {
        setToken(result.data.token);
        setUser({ username: result.data.username, email: result.data.email });
      } else {
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setUser({ username: "", email: "" });
      setToken("");
      //window.location.href = "/";
    }
  }

  const login = async (data: ILogin) => {
    try {
      const result = await axios.post(
        `${url}/login`,
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true },
      );
      if (result.data.result === true) {
        setUser({ ...user, username: data.username as string });
        setToken(result.data.token);
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
      setUser({ username: "", email: "" });
      setToken("");
      window.location.href = "/";
    }
  };

  const register = async (data: IRegister) => {
    try {
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

  useEffect(() => {
    RefreshSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
