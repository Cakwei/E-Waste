import Home from "@/pages/Home/page";
import Login from "@/pages/Login/page";
import Register from "@/pages/Register/page";
import "@/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "@/context/AuthProvider";
import CollectionForm from "@/pages/CollectionForm/page";
import Profile from "@/pages/Profile/page";
import ViewRequest from "@/pages/ViewRequest/page";
import Request from "@/pages/Request/page";
import Support from "@/pages/Support/Support";
import Logout from "@/pages/Logout/page";
import { Toaster } from "@/components/Sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "@/components/ProtectedRoutes";

function App() {
  const queryClient = new QueryClient();
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

              {/* Protected */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/support" element={<Support />} />
                <Route path="/profile/request" element={<Request />} />
                <Route path="/profile/request/:id" element={<ViewRequest />} />
                <Route path="/profile/logout" element={<Logout />} />
              </Route>

              {/* Unknown  */}
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
