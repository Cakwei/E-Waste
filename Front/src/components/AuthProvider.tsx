import { endPointUrl } from "@/lib/exports";
import axios from "axios";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";

interface ILogin {
  email: string;
  password: string;
}
interface IUser {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export type ProviderProps = {
  user: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
  token: string;
  loading: boolean;
  login(data: ILogin): void;
  logout(e: React.FormEvent): void;
  register(data: IUser): void;
};

const AuthContext = createContext<ProviderProps>({
  user: { username: "", email: "", firstName: "", lastName: "", role: "" },
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
    role: "",
  });
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function RefreshSession() {
    try {
      setLoading(true);

      const result = await axios.post(
        `${endPointUrl}/token`,
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
          role: result.data.role,
        });
      } else {
        setUser({
          username: "",
          email: "",
          firstName: "",
          lastName: "",
          role: "",
        });
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setUser({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      });
      setToken("");
      //window.location.href = "/";
    }
  }

  const login = async (data: ILogin) => {
    try {
      const emailRegexExpression =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (data.email) {
        if (!emailRegexExpression.test(data.email)) {
          alert("Invalid email address");
          return;
        }
      }

      const result = await axios.post(
        `${endPointUrl}/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );
      if (result.data.result === true) {
        console.log(result.data.message);
        setUser({
          username: result.data.username,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          role: result.data.role,
        });
        setToken(result.data.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.");
    }
  };

  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await axios.post(
      `${endPointUrl}/logout`,
      {},
      { withCredentials: true },
    );
    if (result.status === 200) {
      setUser({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      });
      setToken("");
      window.location.href = "/";
    }
  };

  const register = async (data: IUser) => {
    try {
      const result = await axios.post(`${endPointUrl}/register`, {
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
