import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { NavLink } from "react-router";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const auth = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      auth.login(formData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <Header />
      <article className="mt-[64px] flex min-h-[500px] w-full items-center justify-center bg-[#08948c] p-5 min-[324px]:h-[calc(100vh-64px-250px)] sm:h-[calc(100vh-64px-192px)]">
        <form
          onSubmit={(e) => login(e)}
          className="shadow-accent flex w-full max-w-[475px] min-w-[150px] flex-col gap-2.5 rounded-2xl bg-white p-10 drop-shadow-2xl"
        >
          <h1 className="text-center text-4xl font-bold">SIGN IN</h1>
          <div className="">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter email address"
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
                name="password"
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange}
                required
                placeholder="Enter password"
              />
            </label>
          </div>

          <div className="flex justify-between">
            <label className="label">
              <input
                type="checkbox"
                onClick={() => setShowPassword(!showPassword)}
                className="checkbox h-5 w-5"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn border bg-[#30b4ac] text-white outline-none"
          >
            Login
          </button>
          <NavLink to="/register" className="w-full text-center text-sm">
            {" New user? "}
            <span className="hover:link text-blue-500">Create an account</span>
          </NavLink>
        </form>
      </article>
      <Footer />
    </div>
  );
}
