import Footer from "@/components/Footer";
import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { useEffect, useState, type ReactNode } from "react";

const profileTabs: { label: string; tab: string; href: string | null }[] = [
  { label: "Home", tab: "", href: "/" },
  { label: "My Profile", tab: "profile", href: null },
  { label: "My Requests", tab: "request", href: null },
  { label: "Help & Support", tab: "support", href: null },
];

export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentTab, setCurrentTab] = useState<string>("profile");

  function selectTab(auth: ProviderProps) {
    switch (currentTab) {
      case "request":
        return RequestTab(auth);
      case "profile":
        return ProfileTab(auth);
      case "support":
        return SupportTab();
      default:
        break;
    }
  }

  useEffect(() => {
    selectTab(auth);
    console.log(currentTab);
  }, [currentTab]);

  return (
    <>
      <div className="relative flex h-[95vh] w-full min-w-[324px] text-black">
        <nav className="absolute top-0 left-0 z-[0] h-full w-[20%] min-w-[200px] bg-[#056b66]">
          <div className="flex w-full justify-center p-2.5">
            <img
              onClick={() => {
                navigate("/");
              }}
              className="w-10 min-w-10 cursor-pointer rounded-[50%] bg-zinc-400"
              src={logo}
            />
          </div>
          <ul>
            {profileTabs.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  if (item.label === "Home") {
                    navigate("/");
                  } else {
                    setCurrentTab(item.tab);
                  }
                }}
                className="mx-2.5 cursor-pointer p-2.5 text-white hover:rounded-md hover:bg-[black]/20"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute ml-[max(20%,200px)] flex h-full flex-wrap overflow-scroll bg-transparent text-black">
          {selectTab(auth) as ReactNode}
        </div>
      </div>
      <Footer className={"min-w-[324px]"} />
    </>
  );
}

function SupportTab() {
  return (
    <div>
      <h1 className="text-lg font-bold">Support</h1>
    </div>
  );
}

function ProfileTab(auth: ProviderProps) {
  return (
    <div>
      <h1 className="text-lg font-bold">Welcome, {auth.user}</h1>
    </div>
  );
}

function RequestTab(auth: ProviderProps) {
  auth; // Remove this
  return (
    <div>
      <h1 className="text-lg font-bold">Request</h1>
    </div>
  );
}
