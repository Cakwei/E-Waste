import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function CollectionForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      alert("You are not logged in");
      navigate("/");
    }
  }, [auth.user]);
  return (
    <>
      <Header />
      <div className="mt-[64px] min-w-[324px] font-[montserrat] font-light">
        <Hero />
        <Footer />
      </div>
    </>
  );
}
