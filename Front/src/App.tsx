import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContext } from "@/lib/Auth";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  return (
    <BrowserRouter>
      <AuthContext value={{ user: null, token: "" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
