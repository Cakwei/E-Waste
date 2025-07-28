import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthProvider";
import CollectionForm from "./components/CollectionForm";
import Profile from "./pages/Profile/Profile";
import ViewRequest from "./pages/ViewRequest";
import Request from "./pages/Request";
import Support from "./pages/Support";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collection" element={<CollectionForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/support" element={<Support />} />
          <Route path="/profile/request" element={<Request />} />
          <Route path="/profile/request/:id" element={<ViewRequest />} />
          <Route path="/profile/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
