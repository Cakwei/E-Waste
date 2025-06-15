import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import CollectionForm from "./components/CollectionForm";
import ViewRequest from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collection" element={<CollectionForm />} />
          <Route path="/profile/:tab?" element={<ViewRequest />} />
          <Route path="/profile/:tab?/:id" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
