import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "@/context/AuthProvider";

interface FormData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Register() {
  const auth = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  async function register(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData.firstName.trim());
    if (
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== ""
    ) {
      auth.register(formData);
    } else {
      alert("Please provide a valid input");
      return;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="">
      <Header />
      <article className="mt-[64px] flex min-h-[500px] w-full items-center justify-center bg-[#08948c] p-5 min-[324px]:h-[calc(100vh-64px-250px)] sm:h-[calc(100vh-64px-192px)]">
        <form
          onSubmit={(e) => {
            register(e);
          }}
          className="flex w-full max-w-[550px] min-w-[150px] flex-col gap-2.5 rounded-2xl bg-white p-10 outline outline-zinc-400"
        >
          <h1 className="text-center text-4xl font-bold">SIGN UP</h1>
          <div className="">
            <span className="text-sm">Username:</span>
            <label className="input validator w-full border border-zinc-300 focus-within:border-black focus-within:outline-none">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                onChange={handleInputChange}
                value={formData.username}
                name="username"
                type="text"
                required
                placeholder="Enter username"
              />
            </label>
          </div>
          <div className="flex gap-2.5">
            <div className="basis-[50%]">
              <span className="text-sm">First Name:</span>
              <label className="input validator w-full border border-zinc-300 focus-within:border-black focus-within:outline-none">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  onChange={handleInputChange}
                  value={formData.firstName}
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter username"
                />
              </label>
            </div>

            <div className="basis-[50%]">
              <span className="text-sm">Last Name:</span>
              <label className="input validator w-full border border-zinc-300 focus-within:border-black focus-within:outline-none">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  onChange={handleInputChange}
                  value={formData.lastName}
                  name="lastName"
                  type="text"
                  required
                  placeholder="Enter username"
                />
              </label>
            </div>
          </div>

          <div>
            <span className="text-sm">Email Address:</span>
            <label className="input validator w-full border border-zinc-300 focus-within:border-black focus-within:outline-none">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                onChange={handleInputChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Enter email address"
                required
              />
            </label>
          </div>
          <div>
            <span className="text-sm">Password:</span>
            <label className="input validator w-full border border-zinc-300 focus-within:border-black focus-within:outline-none">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                onChange={handleInputChange}
                value={formData.password}
                name="password"
                type="password"
                required
                placeholder="Enter password"
              />
            </label>
          </div>
          <button
            name="password"
            type="submit"
            className="btn border bg-[#30b4ac] text-white outline-none"
          >
            Register
          </button>
          <div className="flex justify-between">
            <NavLink to="/login" className="w-full text-center text-sm">
              {" Existing user? "}
              <span className="hover:link text-blue-500">Sign in now</span>
            </NavLink>
          </div>
        </form>
      </article>
      <Footer />
    </div>
  );
}
