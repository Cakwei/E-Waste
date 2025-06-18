import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import CollectionForm from "./components/CollectionForm";
import Profile from "./pages/Profile";
import ViewRequest from "./pages/ViewRequest";
import Request from "./pages/Request";
import Support from "./pages/Support";

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
          <Route path="/profile/request/:id?" element={<ViewRequest />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
