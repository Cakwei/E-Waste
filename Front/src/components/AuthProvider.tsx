import { url } from "@/lib/exports";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

interface IUser {
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type ProviderProps = {
  user: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  token: string;
  loading: boolean;
  login(data: IUser): void;
  logout(e: React.FormEvent): void;
  register(data: IUser): void;
};

const AuthContext = createContext<ProviderProps>({
  user: { username: "", email: "", firstName: "", lastName: "" },
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
    firstName: "",
    lastName: "",
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
        setUser({
          username: result.data.username,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        });
      } else {
        setUser({ username: "", email: "", firstName: "", lastName: "" });
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setUser({ username: "", email: "", firstName: "", lastName: "" });
      setToken("");
      //window.location.href = "/";
    }
  }

  const login = async (data: IUser) => {
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
        setUser({
          username: data.username,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        });
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
    const result = await axios.post(
      `${url}/logout`,
      {},
      { withCredentials: true },
    );
    if (result.status === 200) {
      setUser({ username: "", email: "", firstName: "", lastName: "" });
      setToken("");
      window.location.href = "/";
    }
  };

  const register = async (data: IUser) => {
    try {
      const result = await axios.post(`${url}/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
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

  useLayoutEffect(() => {
    RefreshSession();
  }, []);

  useEffect(() => console.log(user), [user]);
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
