import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const profileTabs: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "My Requests", href: "/" },
  { label: "Help & Support", href: "/" },
];
export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  function selectTab(option: string) {
    switch (option) {
      case "my_request":
        break;
      case "support":
        break;
    }
  }
  return (
    <>
      <div className="relative flex h-[95vh] w-full min-w-[324px] text-black">
        <nav className="absolute top-0 left-0 z-[0] h-full w-[20%] min-w-[200px] bg-[#056b66]">
          <div className="flex w-full justify-center p-2.5">
            <img
              onClick={() => {
                navigate("/");
              }}
              className="w-10 min-w-10 rounded-[50%] bg-zinc-400"
              src={logo}
            />
          </div>
          <ul>
            {profileTabs.map((item) => (
              <li
                key={item.label}
                className="mx-2.5 cursor-pointer p-2.5 text-white hover:rounded-md hover:bg-[black]/20"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute ml-[max(20%,200px)] flex h-full flex-wrap overflow-scroll bg-transparent text-black">
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
          dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe dwefwe
        </div>
        <h1>{auth.user}</h1>
      </div>
      <Footer />
    </>
  );
}
