import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import defaultProfileIcon from "@/assets/defaultProfileIcon.jpg";
import { useEffect } from "react";
export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  /* const links = [
    { label: "About", href: "#1" },
    { label: "About", href: "#2" },
    { label: "About", href: "#3" },
  ];*/
  const profileLinks = [
    { label: "My profile", href: "/profile" },
    { label: "My Requests", href: "#2" },
  ];

  return (
    <header className="bg-base-200 fixed top-0 left-0 z-100 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-5 text-teal-600">
              <div className="block">
                <div className="drawer">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer"
                      className="drawer-button bg-base-10 w-full rounded-[50%] p-2.5 hover:cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay hover:cursor-default"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                      {/* Sidebar content here */}
                      <li>
                        <NavLink to="#">Login/Register</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Sidebar Item 2</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <button  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>*/}
              </div>
              <img
                onClick={() => {
                  navigate("/");
                }}
                className="h-10 w-10 min-w-10 rounded-[50%] bg-zinc-400 hover:cursor-pointer"
                src={logo}
              />
            </div>
          </div>

          {auth.token !== "" ? (
            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                role="button"
                src={defaultProfileIcon}
                alt=""
                className="size-8 cursor-pointer rounded-[50%] object-cover outline transition-all hover:outline-2"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu z-10 w-52 rounded-md bg-white p-2.5 shadow-sm"
              >
                {profileLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.href}
                    className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="flex w-full flex-col">
                  <span className="divider divider-neutral m-0 mx-2.5 before:h-[1px] before:bg-zinc-300 after:h-[1px] after:bg-zinc-300"></span>
                </div>
                <button
                  onClick={(e) => auth.logout(e)}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {auth.loading ? (
                  <div className="skeleton size-10 h-10 w-10 rounded-[50%]"></div>
                ) : (
                  <>
                    <NavLink
                      className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                      to="/login"
                    >
                      Login
                    </NavLink>{" "}
                    <div className="hidden sm:flex">
                      <NavLink
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                        to="/register"
                      >
                        Register
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
