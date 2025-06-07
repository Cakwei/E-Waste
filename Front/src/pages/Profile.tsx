import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import {
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

const profileTabs: {
  label: string;
  tab: string;
  href: string | null;
  icon: string;
}[] = [
  { label: "Home", tab: "", href: "/", icon: "bi bi-house-fill" },
  {
    label: "My Profile",
    tab: "profile",
    href: null,
    icon: "bi bi-person-bounding-box",
  },
  {
    label: "My Requests",
    tab: "request",
    href: null,
    icon: "bi bi-ticket-fill",
  },
  {
    label: "Help & Support",
    tab: "support",
    href: null,
    icon: "bi bi-info-circle-fill",
  },
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
  useEffect(() => {
    if (auth.user) {
      setFormData({
        username: auth.user.username,
        email: auth.user.email,
        password: null,
      });
    }
  }, [auth]);
  useEffect(() => console.log(formData), [formData]);
  return (
    <>
      <div className="relative flex w-full min-w-[324px] text-black md:h-[100vh]">
        {/*Desktop navigation */}
        <nav
          className={`fixed top-0 left-0 z-[50] hidden h-full min-w-[200px] overflow-y-scroll bg-[#056b66] md:block md:w-[20%]`}
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
                <i className={`${item.icon} mr-5`}></i>
                {`${item.label}`}
              </li>
            ))}
          </ul>
        </nav>

        {/*Mobile navigation */}
        <div className="dock rounded-tl-md rounded-tr-md bg-[#056b66] text-white md:hidden">
          <button>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <polyline
                  points="3 14 9 14 9 17 15 17 15 14 21 14"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></polyline>
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></rect>
              </g>
            </svg>
            <span className="dock-label">Inbox</span>
          </button>

          <button className="dock-active" onClick={() => navigate("/")}>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <polyline
                  points="1 11 12 2 23 11"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></polyline>
                <path
                  d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></path>
                <line
                  x1="12"
                  y1="22"
                  x2="12"
                  y2="18"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></line>
              </g>
            </svg>
            <span className="dock-label">Home</span>
          </button>

          <button>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></circle>
                <path
                  d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  stroke-miterlimit="10"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
            <span className="dock-label">Settings</span>
          </button>
        </div>

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
      <form className="flex h-max w-full flex-col rounded-2xl p-5 pb-10 outline md:basis-[50%]">
        <h1 className="text-lg font-semibold">My Profile</h1>
        <div className="w-[65%]">
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1">
            <label className="sm:text-nowrap">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleInput(e)}
              placeholder="Username"
              defaultValue={auth.user?.username}
            />
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1">
            <label className="sm:text-nowrap">Email Address</label>
            <input
              type="text"
              name="email"
              onChange={(e) => handleInput(e)}
              placeholder="Email Address"
              defaultValue={auth.user?.email}
            />
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1">
            <label className="sm:text-nowrap">Current Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
              placeholder="Password"
            />
          </div>
        </div>

        {editPassword && <input type="password" placeholder="Password" />}

        <input type="submit" value="Update information" />
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
