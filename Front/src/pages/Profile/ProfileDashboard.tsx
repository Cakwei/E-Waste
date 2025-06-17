import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { House, MessageCircleQuestion, SquareUser, Ticket } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { url } from "@/lib/exports";
import axios from "axios";
import { useNavigate } from "react-router";
import SupportTab from "./Support";
import logo from "@/assets/logo.png";
import ProfileTab from "./ProfileTab";
import RequestTab from "./RequestTab";
export type IRequest = {
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

export const profileTabs: {
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
export default function Profile() {
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
  const [open, setOpen] = useState(false);
  function selectTab() {
    switch (currentTab) {
      case "request":
        return <RequestTab data={data} />;
      case "profile":
        return <ProfileTab auth={auth} formData={formData} />;
      case "support":
        return <SupportTab />;
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
