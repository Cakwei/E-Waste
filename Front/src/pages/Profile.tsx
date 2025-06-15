import {
  useEffect,
  useLayoutEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import {
  type LucideIcon,
  ArrowRight,
  User,
  Fingerprint,
  Settings,
  X,
  Pencil,
  House,
  MessageCircleQuestion,
  SquareUser,
  Ticket,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth, type ProviderProps } from "@/components/AuthProvider";
import CollectionForm from "@/components/CollectionForm";
import { url } from "@/lib/exports";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

type IRequest = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  state: string;
  wasteDescription: string;
  images: string;
  creationDate: string;
  status: string;
};

type IFormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

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
  icon: ReactNode | string;
}[] = [
  {
    label: "Return to Homepage",
    tab: "home",
    href: "/",
    icon: <i className="bi bi-house text-lg"></i>,
  },
  {
    label: "My Information",
    tab: "profile",
    href: null,
    icon: <i className="bi bi-person-bounding-box text-lg"></i>,
  },
  {
    label: "My Requests",
    tab: "request",
    href: null,
    icon: <i className="bi bi-ticket text-lg"></i>,
  },
  {
    label: "Help & Support",
    tab: "support",
    href: null,
    icon: <i className="bi bi-person-raised-hand text-lg"></i>,
  },
];
export default function ViewRequest() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentTab, setCurrentTab] = useState<string>(
    window.location.href.includes(`${import.meta.env.VITE_WEB_URL}/profile/`)
      ? window.location.href.split(
          `${import.meta.env.VITE_WEB_URL}/profile/`,
        )[1]
      : "profile",
  );
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  //const [hideNewPasswordInput, setHideNewPasswordInput] =
  // useState<boolean>(true);
  //const [image, setImage] = useState<string[]>([]);
  const [data, setData] = useState<IRequest[] | null>(null);
  const [viewData, setViewData] = useState<IRequest | null>(null);
  const [open, setOpen] = useState(false);
  function selectTab() {
    switch (currentTab) {
      case "request":
        return RequestTab(data, viewData, setViewData);
      case "profile":
        return ProfileTab(auth, formData);
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
        console.log(result);
        if (result.data.result) {
          setData(result.data.message);
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
  /*
  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
*/
  useEffect(() => {
    selectTab();

    switch (currentTab) {
      case "home":
        navigate("/");
        break;
      case "request":
        navigate("/profile/request");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "support":
        navigate("/profile/support");
        break;
    }
  }, [currentTab, setCurrentTab]);

  /*
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }*/

  useLayoutEffect(() => {
    if (
      auth.user?.username === "" &&
      auth.user?.firstName === "" &&
      auth.user?.lastName == "" &&
      auth.user?.email === "" &&
      auth.token === "" &&
      !auth.loading
    ) {
      navigate("/login");
      return;
    }
    if (
      auth.user?.username !== "" &&
      auth.user?.firstName !== "" &&
      auth.user?.lastName !== "" &&
      auth.user?.email !== "" &&
      auth.user
    ) {
      if (currentTab === "request") {
        fetchData();
      }

      setFormData({
        username: auth.user.username,
        email: auth.user.email,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [auth]);
  /*
  useEffect(() => {
    if (currentTab === "profile") {
      if (formData.currentPassword.length > 0) {
        setHideNewPasswordInput(false);
      } else {
        setHideNewPasswordInput(true);
      }
    }
  }, [formData.currentPassword]);
*/
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div
      className={cn(
        "flex h-dvh max-h-dvh min-h-dvh w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]",
      )}
    >
      <div className="hidden md:block">
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <>
                <Logo />
              </>
              <div className="mt-8 flex flex-col gap-2">
                {profileTabs.map((link, index) => (
                  <SidebarLink
                    className="hover:cursor-default"
                    setCurrentTab={setCurrentTab}
                    key={index}
                    link={link}
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      {/*Mobile navigation */}
      <div className="dock rounded-tl-md rounded-tr-md bg-[#056b66] text-white md:hidden">
        <button
          onClick={() => {
            setCurrentTab("home");
          }}
        >
          <House size={20} />

          <span className="dock-label">Home</span>
        </button>{" "}
        <button
          onClick={() => {
            console.log("erewgewgew");

            setCurrentTab("profile");
          }}
        >
          <SquareUser size={20} />

          <span className="dock-label">Profile</span>
        </button>
        <button
          onClick={() => {
            console.log("erewgewgew");

            setCurrentTab("request");
          }}
        >
          <Ticket size={20} />

          <span className="dock-label">Request</span>
        </button>
        <button
          onClick={() => {
            console.log("erewgewgew");

            setCurrentTab("support");
          }}
        >
          <MessageCircleQuestion size={20} />

          <span className="dock-label">Help & Support</span>
        </button>
      </div>
      <Dashboard selectTab={selectTab} />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center gap-x-5 space-x-2 py-1 text-sm font-normal text-white"
    >
      <img
        src={logo}
        className="w-full max-w-6.5 min-w-6.5 cursor-pointer rounded-[50%] bg-zinc-400"
      />
      <span className="w-[100px] overflow-hidden text-xl font-semibold text-nowrap">
        E-Waste
      </span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

const Dashboard = ({ selectTab }: { selectTab: () => void }) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-wrap bg-gray-50 text-black">
        {selectTab() as ReactNode}
      </div>
    </div>
  );
};

function RequestTab(
  data: IRequest[] | null,
  viewData: IRequest | null,
  setViewData: (viewData: IRequest | null) => void,
) {
  function selectBadge(data: { status: string }) {
    switch (data.status) {
      case "created":
        return (
          <div className="badge badge-success p-1.5 font-semibold text-white">
            Created
          </div>
        );
      case "picked_up":
        return (
          <div className="badge badge-success p-1.5 font-semibold text-white">
            Picked Up
          </div>
        );
    }
  }
  return (
    <div className="flex h-dvh w-full flex-col bg-gray-50 p-5 font-sans md:h-full">
      <div className="flex max-w-[1080px] flex-col items-start gap-2.5 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-semibold">Collection Requests</h1>
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
        <section
          className={`${data && data.length > 0 ? "max-h-[calc(100dvh-250px)]" : "h-50"} w-full overflow-scroll rounded-2xl outline`}
        >
          <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{selectBadge(item)}</TableCell>
                    <TableCell>
                      {new Date(item.creationDate).getDate() +
                        "-" +
                        new Date(item.creationDate).getMonth() +
                        "-" +
                        new Date(item.creationDate).getFullYear()}
                    </TableCell>
                    <TableCell className="">
                      <button
                        onClick={() => {
                          setViewData(item || item);
                          (
                            document.getElementById(
                              "my_modal_2",
                            ) as HTMLDialogElement
                          ).showModal();
                        }}
                        className="btn btn-primary max-h-[30px] border-none bg-[#30b4ac] font-normal shadow-none"
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="relative h-[27px] w-full">
                  <TableCell>
                    <span className="loading loading-spinner loading-md absolute left-[50%] flex translate-x-[-50%] justify-center py-2.5"></span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        {/* Modal for new request */}
        <dialog id="my_modal_1" className="modal">
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

        {/* Modal for view
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Submitted Request Details</h3>
            <p className="py-4">{JSON.stringify(viewData)}</p>
          </div>
          <form method="dialog" className="modal-backdrop hover:cursor-default">
            <button className="hover:cursor-default">close</button>
          </form>
        </dialog> */}
      </div>
    </div>
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

function ProfileTab(auth: ProviderProps, formData: IFormData) {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await axios.post(
      `${url}/users/${auth.user?.email}/change-username`,
      formData,
    );
    if (result.data.result === true) {
      console.log(result);
    }
  }
  return (
    <div className="flex w-full justify-start bg-gray-50 p-5">
      <form
        onSubmit={handleSubmit}
        className="flex h-max w-full flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-5 pb-7.5 shadow-md transition-shadow duration-300 hover:shadow-lg md:max-w-[650px]"
      >
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="flex w-full flex-col gap-2.5">
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Username</label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                <span>{auth.user?.username}</span>
                <Pencil
                  size={15}
                  className="hover:cursor-pointer"
                  onClick={() =>
                    (
                      document.querySelector("#my_modal_2") as HTMLDialogElement
                    ).showModal()
                  }
                />
              </div>
            )}
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Email Address</label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                <span>{auth.user?.email}</span>
                <Pencil
                  size={15}
                  className="hover:cursor-pointer"
                  onClick={() =>
                    (
                      document.querySelector("#my_modal_2") as HTMLDialogElement
                    ).showModal()
                  }
                />
              </div>
            )}
          </div>
          <div className="flex w-full justify-between border-b border-b-zinc-300 pb-1 pl-1">
            <label className="sm:text-nowrap">Current Password</label>
            {auth.loading ? (
              <div className="skeleton basis-[50%]"></div>
            ) : (
              <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                <span>{auth.user?.email}</span>
                <Pencil
                  size={15}
                  className="hover:cursor-pointer"
                  onClick={() =>
                    (
                      document.querySelector("#my_modal_2") as HTMLDialogElement
                    ).showModal()
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/*!hideNewPasswordInput && (
          <div className="flex w-full border-b border-b-zinc-300 pb-1 pl-1">
            <label className="basis-[50%] sm:text-nowrap">New Password</label>
            <input
              type="password"
              onChange={(e) => handleInput(e)}
              placeholder="Password"
              name="newPassword"
            />
          </div>
        )*/}
      </form>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Account Information Edit</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
