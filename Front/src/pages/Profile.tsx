import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import {
  useEffect,
  useLayoutEffect,
  useState,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  ArrowRight,
  User,
  Fingerprint,
  Settings,
  type LucideIcon,
  X,
} from "lucide-react"; // Importing icons from Lucide React
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import CollectionForm from "@/components/CollectionForm";
import { url } from "@/lib/exports";
import axios from "axios";

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
  {
    label: "Return to Homepage",
    tab: "home",
    href: "/",
    icon: "bi bi-house-fill",
  },
  {
    label: "My Information",
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

const featureCards: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ArrowRight,
    title: "Getting Started",
    description:
      "Everything you need to know to get started and get to work with the application.",
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
    title: "Account Information",
    description: "Adjust your profile and preferences to meet your needs.",
  },
];

interface IFormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentTab, setCurrentTab] = useState<string>(
    window.location.href.includes("/profile/#")
      ? window.location.href.split("#")[1]
      : "profile",
  );

  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [hideNewPasswordInput, setHideNewPasswordInput] =
    useState<boolean>(true);
  //const [image, setImage] = useState<string[]>([]);
  //const [data, setData] = useState([]);

  function selectTab() {
    switch (currentTab) {
      case "request":
        return RequestTab();
      case "profile":
        return ProfileTab(auth, hideNewPasswordInput, (e) => handleInput(e));
      case "support":
        return SupportTab();
      default:
        break;
    }
  }
  async function fetchData() {
    try {
      if (
        !auth.loading &&
        auth.user?.username !== "" &&
        auth.user?.email !== ""
      ) {
        const result = await axios.post(
          `${url}/waste-collection/${auth.user?.email}`,
          {},
          { withCredentials: true },
        );
        if (result.data.result) {
          /* const convertedImagesStringOfArray = Buffer.Buffer.from(
            result.data.message.images.data,
          ).toString("utf-8");
          const convertedImagesArray = JSON.parse(convertedImagesStringOfArray);
          if (result.data.result === true) {
            // setImage(convertedImagesArray);
          }*/
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    selectTab();

    switch (currentTab) {
      case "home":
        navigate("/");
        break;
      case "request":
        fetchData();
        navigate("/profile/#request");
        break;
      case "profile":
        navigate("/profile/#profile");
        break;
      case "support":
        navigate("/profile/#support");
        break;
    }
  }, [currentTab]);

  /*
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }*/

  useLayoutEffect(() => {
    if (
      auth.user?.username === "" &&
      auth.token === "" &&
      auth.user?.email === "" &&
      !auth.loading
    ) {
      navigate("/login");
    }

    if (auth.user?.username !== "" && auth.user?.email !== "" && auth.user) {
      setFormData({
        username: auth.user.username,
        email: auth.user.email,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [auth]);

  useEffect(() => {
    if (formData.currentPassword.length > 0) {
      setHideNewPasswordInput(false);
    } else {
      setHideNewPasswordInput(true);
    }
  }, [formData]);

  return auth.loading ? (
    <div className="fixed h-dvh w-dvh bg-white"></div>
  ) : (
    <>
      <div className="relative flex w-full text-black md:h-[100vh]">
        {/*Desktop navigation */}
        <nav
          className={`fixed top-0 left-0 z-[50] hidden h-full max-w-[250px] min-w-[250px] overflow-y-clip bg-[#056b66] md:block md:w-[25%]`}
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
                  strokeMiterlimit="10"
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
                  strokeMiterlimit="10"
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
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></polyline>
                <path
                  d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
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
                  strokeMiterlimit="10"
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
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></circle>
                <path
                  d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
            <span className="dock-label">Settings</span>
          </button>
        </div>

        <div className="flex h-full w-full flex-wrap bg-gray-50 text-black md:pl-[250px]">
          {selectTab() as ReactNode}
        </div>
      </div>
    </>
  );
}

function RequestTab(): JSX.Element {
  return (
    <div className="flex h-dvh w-full flex-col bg-gray-50 p-5 font-sans md:h-full">
      <div className="flex max-w-[1080px] flex-col items-start gap-2.5 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <div className="flex justify-between">
          <button
            onClick={() => {
              (
                document.getElementById("my_modal_1") as HTMLDialogElement
              ).showModal();
            }}
            className="btn border-none bg-[#028b85] font-normal text-white"
          >
            Create New Request
          </button>
        </div>
        <section className="max-h-50 w-full overflow-scroll rounded-2xl outline">
          <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Collection</TableCell>
                  <TableCell>$69.00</TableCell>
                  <TableCell>01-01-2025</TableCell>
                  <TableCell className="">
                    <button
                      onClick={() => {
                        (
                          document.getElementById(
                            "my_modal_2",
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                      className="btn btn-primary max-h-[30px] border-none bg-[#30b4ac] font-normal"
                    >
                      Pay
                    </button>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </section>

        {/* Modal for new request */}
        <dialog id="my_modal_1" className="modal z-[-1]">
          <div className="modal-box my-5 flex min-h-[90%] flex-col gap-2.5 md:max-h-[90%] md:min-w-[650px]">
            <div className="flex justify-end gap-2.5">
              <X
                onClick={() => {
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  ).close();
                }}
                className="rounded-[50%] p-1 text-zinc-400 transition-all duration-300 hover:bg-zinc-300 hover:text-white"
                size={35}
              />
            </div>
            <CollectionForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="hover:cursor-default">close</button>
          </form>
        </dialog>

        {/* Modal for payment */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Lorum Ipsum</h3>
            <p className="py-4">Lorum ipsum</p>
          </div>
          <form method="dialog" className="modal-backdrop hover:cursor-default">
            <button className="hover:cursor-default">close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}

function SupportTab(): JSX.Element {
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
                className="flex min-h-[180px] flex-col items-start rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
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
              key={item.question}
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
  hideNewPasswordInput: SetStateAction<boolean>,
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
): JSX.Element {
  return (
    <div className="flex w-full justify-start bg-gray-50 p-5">
      <form className="flex h-max w-full max-w-[650px] flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="flex w-full flex-col gap-2.5">
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Username</label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => handleInput(e)}
                  placeholder="Username"
                  defaultValue={auth.user?.username}
                  className="basis-[50%]"
                />
              </>
            )}
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Email Address</label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => handleInput(e)}
                  placeholder="Email Address"
                  defaultValue={auth.user?.email}
                  className="basis-[50%]"
                />
              </>
            )}
          </div>
          <div className="flex w-full border-b border-b-zinc-300 pb-1 pl-1">
            <label className="basis-[50%] sm:text-nowrap">
              Current Password
            </label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <>
                <input
                  type="password"
                  name="currentPassword"
                  onChange={(e) => handleInput(e)}
                  placeholder="Password"
                  className="basis-[50%]"
                />
              </>
            )}
          </div>
        </div>

        {!hideNewPasswordInput && (
          <input type="password" placeholder="Password" name="newPassword" />
        )}

        <input
          type="submit"
          className="btn mt-2.5 border border-zinc-300 outline-none"
          value="Update information"
        />
      </form>
    </div>
  );
}
