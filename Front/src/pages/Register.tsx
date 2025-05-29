import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  /*const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username !== "" && formData.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
  };*/
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
      <article className="mt-[64px] flex w-full items-center justify-center bg-[#056b66] p-5 min-[324px]:h-[calc(100vh-64px-250px)] sm:h-[calc(100vh-64px-192px)]">
        <form className="flex w-full max-w-[550px] min-w-[150px] flex-col gap-5 rounded-2xl bg-white p-10 outline outline-zinc-400">
          <h1 className="text-center text-4xl font-bold">SIGN UP</h1>
          <div className="">
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
                placeholder="Username"
              />
            </label>
          </div>

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
              placeholder="mail@site.com"
              required
            />
          </label>

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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              type="password"
              required
              placeholder="Password"
            />
          </label>
          <div className="flex justify-between">
            <NavLink to="/login" className="hover:link">
              I have an account already
            </NavLink>
          </div>

          <button
            name="password"
            type="submit"
            className="btn border outline-none"
          >
            Register
          </button>
        </form>
      </article>
      <Footer />
    </div>
  );
}
