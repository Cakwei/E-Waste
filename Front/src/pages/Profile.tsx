import Footer from "@/components/Footer";
import Header from "../components/Header";
import { useAuth } from "@/components/AuthProvider";

export default function Profile() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <div className="">
        <h1>{auth.user}</h1>
      </div>
      <Footer />
    </>
  );
}
