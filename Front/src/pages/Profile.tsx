import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { endPointUrl } from "@/lib/exports";
import { useAuth } from "@/components/AuthProvider";
import ProfileComponent from "@/components/ProfileComponent";
import { useNavigate } from "react-router";

type IFormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await axios.post(
      `${endPointUrl}/users/${auth.user?.email}/change-username`,
      formData,
    );
    if (result.data.result === true) {
      console.log(result);
    }
  }

  async function handleInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    const isLoggedIn =
      !auth.loading && auth.user?.username !== "" && auth.user?.email !== "";
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [auth]);

  useEffect(() => console.log(formData), [formData, setFormData]);
  return (
    <ProfileComponent>
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
                        document.querySelector(
                          "#my_modal_2",
                        ) as HTMLDialogElement
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
                        document.querySelector(
                          "#my_modal_2",
                        ) as HTMLDialogElement
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
                  <span>HIDDEN</span>
                  <Pencil
                    size={15}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      (
                        document.querySelector(
                          "#my_modal_2",
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </form>

        <dialog id="my_modal_2" className="modal">
          <form className="modal-box">
            <h3 className="text-lg font-bold">Account Information Edit</h3>
            <input
              name="input"
              onChange={handleInput}
              className="rounded-sm px-2.5 outline outline-zinc-300"
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </ProfileComponent>
  );
}
