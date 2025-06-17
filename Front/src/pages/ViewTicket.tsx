import { useLayoutEffect, useState, type ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { House, MessageCircleQuestion, SquareUser, Ticket } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "@/components/AuthProvider";
import { url } from "@/lib/exports";
import axios from "axios";
import { useNavigate } from "react-router";
import { profileTabs } from "./Profile/ProfileDashboard";

export default function ViewTicket() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
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
    }
  }, [auth]);

  return (
    <div
      className={cn(
        "flex h-dvh max-h-dvh min-h-dvh w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]",
      )}
    >
      fwfwf
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
                    setCurrentTab={null}
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
        <button onClick={() => {}}>
          <House size={20} />

          <span className="dock-label">Home</span>
        </button>{" "}
        <button
          onClick={() => {
            console.log("erewgewgew");
          }}
        >
          <SquareUser size={20} />

          <span className="dock-label">Profile</span>
        </button>
        <button
          onClick={() => {
            console.log("erewgewgew");
          }}
        >
          <Ticket size={20} />

          <span className="dock-label">Request</span>
        </button>
        <button
          onClick={() => {
            console.log("erewgewgew");
          }}
        >
          <MessageCircleQuestion size={20} />

          <span className="dock-label">Help & Support</span>
        </button>
      </div>
      <div></div>
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
