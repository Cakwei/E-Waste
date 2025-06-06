import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import {
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

const profileTabs: { label: string; tab: string; href: string | null }[] = [
  { label: "Home", tab: "", href: "/" },
  { label: "My Profile", tab: "profile", href: null },
  { label: "My Requests", tab: "request", href: null },
  { label: "Help & Support", tab: "support", href: null },
];

interface IFormData {
  username: string | null;
  email: string | null;
  password: string | null;
}
export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentTab, setCurrentTab] = useState<string>("profile");
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  });

  function selectTab(auth: ProviderProps) {
    switch (currentTab) {
      case "request":
        return RequestTab(auth);
      case "profile":
        return ProfileTab(auth, editPassword, (e) => handleInput(e));
      case "support":
        return SupportTab();
      default:
        break;
    }
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    selectTab(auth);
    console.log(currentTab);
  }, [currentTab]);

  useEffect(() => console.log(formData), [formData]);
  return (
    <>
      <div className="relative flex h-[100vh] w-full min-w-[324px] text-black">
        <nav
          className={`fixed top-0 left-0 z-[50] hidden h-full min-w-[200px] bg-[#056b66] md:block md:w-[20%]`}
        >
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

        <div className="flex h-full w-full flex-wrap overflow-scroll bg-transparent text-black md:pl-[max(20%,200px)]">
          {selectTab(auth) as ReactNode}
        </div>
      </div>
      {/*<Footer className={"min-w-[324px]"} /> */}
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

function ProfileTab(
  auth: ProviderProps,
  editPassword: SetStateAction<boolean>,
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
  return (
    <div className="flex w-full p-5">
      <form className="flex h-max basis-[50%] flex-col rounded-2xl p-5 pb-10 outline">
        <h1 className="text-lg font-semibold">My Profile</h1>
        <div className="w-[65%]">
          <div className="flex w-full justify-between border-b border-b-black pb-1">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleInput(e)}
              placeholder="Username"
              defaultValue={auth.user?.username}
            />
          </div>
          <div className="flex w-full justify-between border-b border-b-black pb-1">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              onChange={(e) => handleInput(e)}
              placeholder="Email Address"
              defaultValue={auth.user?.email}
            />
          </div>
          <div className="flex w-full justify-between border-b border-b-black pb-1">
            <label>Current Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
              placeholder="Password"
            />
          </div>
        </div>

        {editPassword && <input type="password" placeholder="Password" />}

        <input type="submit" />
      </form>
    </div>
  );
}

function RequestTab(auth: ProviderProps) {
  auth; // Remove this later on
  return (
    <div>
      <h1 className="text-lg font-bold">Request</h1>
      <div className="flex w-full basis-[50%] flex-col">
        <section className="rounded-2xl outline"></section>
      </div>
    </div>
  );
}
