import { useState, type ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { House, MessageCircleQuestion, SquareUser, Ticket } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router";

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
  images: Array<string>;
  creationDate: string;
  status: string;
};

export const profileTabs: {
  label: string;
  tab: string;
  href: string;
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
    href: "/profile",
    icon: <i className="bi bi-person-bounding-box text-lg"></i>,
  },
  {
    label: "My Requests",
    tab: "request",
    href: "/profile/request",
    icon: <i className="bi bi-ticket text-lg"></i>,
  },
  {
    label: "Help & Support",
    tab: "support",
    href: "/profile/support",
    icon: <i className="bi bi-person-raised-hand text-lg"></i>,
  },
];

export default function ProfileComponent({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
            navigate("/");
          }}
        >
          <House size={20} />

          <span className="dock-label">Home</span>
        </button>
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          <SquareUser size={20} />

          <span className="dock-label">Profile</span>
        </button>
        <button
          onClick={() => {
            navigate("/profile/request");
          }}
        >
          <Ticket size={20} />

          <span className="dock-label">Request</span>
        </button>
        <button
          onClick={() => {
            navigate("/profile/support");
          }}
        >
          <MessageCircleQuestion size={20} />

          <span className="dock-label">Help & Support</span>
        </button>
      </div>
      <Dashboard children={children} />
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

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 overflow-scroll">
      <div className="flex h-full w-full flex-wrap bg-gray-50 text-black">
        {children}
      </div>
    </div>
  );
};
