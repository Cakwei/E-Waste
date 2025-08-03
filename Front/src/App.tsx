import Home from "./pages/Home/page";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthProvider";
import CollectionForm from "./components/CollectionForm";
import Profile from "./pages/Profile/page";
import ViewRequest from "./pages/ViewRequest/ViewRequest";
import Request from "./pages/Request/Request";
import Support from "./pages/Support/Support";
import Logout from "./pages/Logout/Logout";
import { Toaster } from "./components/Sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
