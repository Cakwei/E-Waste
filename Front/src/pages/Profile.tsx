import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import {
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  ArrowRight,
  User,
  Fingerprint,
  Settings,
  type LucideIcon,
} from "lucide-react"; // Importing icons from Lucide React
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const accordion = [
  {
    question: "Is it system fully built and finished?",
    answer: "No, I will finish it as soon possible though.",
  },
  {
    question: "What if there is a bug in the system?",
    answer: "Please do report @ charleetan2020@gmail.com if you do. :)",
  },
  {
    question: "What are future features to be added?",
    answer: "For now, I am not sure, sorry.",
  },
];

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

// Data for each feature card, matching the image content
const featureCards: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ArrowRight,
    title: "Getting Started",
    description:
      "Everything you need to know to get started and get to work in ChatCloud.",
  },
  {
    icon: User,
    title: "Admin Settings",
    description:
      "Learn how to manage your current workspace or your enterprise space.",
  },
  {
    icon: Fingerprint,
    title: "Login and Verification",
    description:
      "Read on to learn how to sign in with your email address, or your Apple or Google.",
  },
  {
    icon: Settings,
    title: "Account Setup",
    description:
      "Adjust your profile and preferences to make ChatCloud work just for you.",
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
  setEditPassword(false); // Remove this later on
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
          className={`fixed top-0 left-0 z-[50] hidden h-full min-w-[200px] overflow-y-clip bg-[#056b66] md:block md:w-[20%]`}
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
        <div className="dock fixed bottom-0 left-0 rounded-tl-md rounded-tr-md bg-[#056b66] text-white md:hidden">
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

        <div className="flex h-full w-full flex-wrap bg-transparent text-black md:pl-[max(20%,200px)]">
          {selectTab(auth) as ReactNode}
        </div>
      </div>
      {/*<Footer className={"min-w-[324px]"} /> */}
    </>
  );
}

function SupportTab() {
  return (
    <div className="pb-[64px] md:pb-0">
      <h1 className="bg-gray-50 p-5 text-4xl font-bold uppercase">
        Need assistance?
      </h1>
      <div className="flex flex-col items-center justify-center bg-gray-50 p-5 font-sans">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((Card) => (
              <div
                key={Card.title}
                className="flex min-h-[180px] flex-col items-start rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4">
                  <Card.icon
                    color="#056b66"
                    className="h-8 w-8 text-blue-600"
                  ></Card.icon>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {Card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {Card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1 className="bg-gray-50 p-5 text-4xl font-bold uppercase">
        FAQ Section
      </h1>
      <div className="rounded-md bg-gray-50 p-5 px-5">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-2.5"
        >
          {accordion.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              className="rounded-md px-2.5 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function ProfileTab(
  auth: ProviderProps,
  editPassword: SetStateAction<boolean>,
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
  return (
    <div className="flex w-full justify-start bg-gray-50 p-5">
      <form className="flex h-max w-full flex-col gap-2.5 rounded-2xl bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="w-full">
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleInput(e)}
              placeholder="Username"
              defaultValue={auth.user?.username}
              className="basis-[50%]"
            />
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Email Address</label>
            <input
              type="text"
              name="email"
              onChange={(e) => handleInput(e)}
              placeholder="Email Address"
              defaultValue={auth.user?.email}
              className="basis-[50%]"
            />
          </div>
          <div className="flex w-full border-b border-b-zinc-300 pb-1 pl-1">
            <label className="basis-[50%] sm:text-nowrap">
              Current Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
              placeholder="Password"
              className="basis-[50%]"
            />
          </div>
        </div>

        {editPassword && <input type="password" placeholder="Password" />}

        <input
          type="submit"
          className="btn mt-2.5 border border-zinc-300 outline-none"
          value="Update information"
        />
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
