import axios from "axios";
import { Pencil, X } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { endPointUrl } from "@/lib/exports";
import { useAuth } from "@/context/AuthProvider";
import ProfileWrapper from "@/pages/Profile/ProfileWrapper";
import { useNavigate } from "react-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
/*
type IFormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};*/

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);
  const [hasDoubleConfirmed, setHasDoubleConfirmed] = useState(false);

  const [changeUsernameInputValue, setChangeUsernameInputValue] = useState({
    currentUsername: null,
    newUsername: null,
  });
  const [changeEmailInputValue, setChangeEmailInputValue] = useState({
    currentEmail: null,
    newEmail: null,
  });
  const [changePasswordInputValue, setChangePasswordInputValue] = useState({
    currentPassword: null,
    newPassword: null,
  });
  const [renderModalType, setRenderModalType] = useState<
    "username" | "email" | "password" | null
  >(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); /*
    const result = await axios.post(
      `${endPointUrl}/users/${auth.user?.email}/change-username`,
      formData,
    );
    if (result.data.result === true) {
      console.log(result);
    }*/
  }

  function renderChangeProfileInfoModal() {
    switch (renderModalType) {
      case "username":
        return (
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-base-100 relative rounded-lg p-8 shadow-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 text-xl">
                  <X />
                </button>
              </form>

              <h3 className="text-base-content mb-4 text-2xl font-bold">
                Change Username
              </h3>

              <div>
                <label className="text-sm">Current Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div>
                <label className="text-sm">New Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div className="modal-action mt-6 flex justify-end gap-3">
                <form method="dialog">
                  <Button className="bg-transparent text-black shadow-none hover:bg-zinc-100 hover:shadow">
                    Cancel
                  </Button>
                </form>
                {hasDoubleConfirmed ? (
                  <button className="btn btn-primary">
                    Are you sure? {timer}
                  </button>
                ) : (
                  <Button
                    className="bg-[#08948c] hover:bg-[#08948c]/80"
                    onClick={() => setHasDoubleConfirmed(false)}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        );
      case "email":
        return (
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-base-100 relative rounded-lg p-8 shadow-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 text-xl">
                  <X />
                </button>
              </form>

              <h3 className="text-base-content mb-4 text-2xl font-bold">
                Change Username
              </h3>

              <div>
                <label className="text-sm">Current Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div>
                <label className="text-sm">New Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div className="modal-action mt-6 flex justify-end gap-3">
                <form method="dialog">
                  <Button className="bg-transparent text-black shadow-none hover:bg-zinc-100 hover:shadow">
                    Cancel
                  </Button>
                </form>
                {hasDoubleConfirmed ? (
                  <button className="btn btn-primary">
                    Are you sure? {timer}
                  </button>
                ) : (
                  <Button
                    className="bg-[#08948c] hover:bg-[#08948c]/80"
                    onClick={() => setHasDoubleConfirmed(false)}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        );

      case "password":
        return (
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-base-100 relative rounded-lg p-8 shadow-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 text-xl">
                  <X />
                </button>
              </form>

              <h3 className="text-base-content mb-4 text-2xl font-bold">
                Change Username
              </h3>

              <div>
                <label className="text-sm">Current Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div>
                <label className="text-sm">New Username:</label>
                <Input
                  className=""
                  name="username"
                  onChange={(e) => {
                    handleInput(e, "username");
                  }}
                />
              </div>
              <div className="modal-action mt-6 flex justify-end gap-3">
                <form method="dialog">
                  <Button className="bg-transparent text-black shadow-none hover:bg-zinc-100 hover:shadow">
                    Cancel
                  </Button>
                </form>
                {hasDoubleConfirmed ? (
                  <button className="btn btn-primary">
                    Are you sure? {timer}
                  </button>
                ) : (
                  <Button
                    className="bg-[#08948c] hover:bg-[#08948c]/80"
                    onClick={() => setHasDoubleConfirmed(false)}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        );
      default:
        return;
    }
  }

  async function handleInput(
    e: ChangeEvent<HTMLInputElement>,
    field: "username" | "email" | "password",
  ) {
    e.preventDefault();
    const { name, value } = e.target;
    switch (field) {
      case "username":
        setChangeUsernameInputValue((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "email":
        setChangeUsernameInputValue((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "password":
        setChangeUsernameInputValue((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
      default:
        throw Error(
          "Invalid field name, choose between username, email & password.",
        );
    }
  }

  useLayoutEffect(() => {
    const isLoggedIn =
      !auth.loading && auth.user?.username !== "" && auth.user?.email !== "";
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [auth]);

  return (
    <ProfileWrapper>
      <div className="flex w-full justify-start bg-gray-50 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex h-max w-full flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-5 pb-7.5 shadow-md transition-shadow duration-300 hover:shadow-lg md:max-w-[650px]"
        >
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex w-full justify-between gap-5 border-b border-b-zinc-300 pb-1 pl-1">
              <label className="sm:text-nowrap">Username</label>
              {auth.loading ? (
                <div className="skeleton basis-[50%]"></div>
              ) : (
                <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                  <span className="w-[40%] overflow-hidden text-ellipsis md:w-fit">
                    {auth.user?.username}
                  </span>
                  <Pencil
                    size={15}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setRenderModalType("username");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex w-full justify-between gap-5 border-b border-b-zinc-300 pb-1 pl-1">
              <label className="sm:text-nowrap">Email Address</label>
              {auth.loading ? (
                <div className="skeleton basis-[50%]"></div>
              ) : (
                <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                  <span className="w-[40%] overflow-hidden text-ellipsis md:w-fit">
                    {auth.user?.email}
                  </span>
                  <Pencil
                    size={15}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setRenderModalType("email");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex w-full justify-between gap-5 border-b border-b-zinc-300 pb-1 pl-1">
              <label className="sm:text-nowrap">Current Password</label>
              {auth.loading ? (
                <div className="skeleton basis-[50%]"></div>
              ) : (
                <div className="flex w-full basis-[50%] items-center justify-start gap-5">
                  <span className="w-[40%] overflow-hidden text-ellipsis md:w-fit">
                    HIDDEN
                  </span>
                  <Pencil
                    size={15}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setRenderModalType("password");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Modal dialog for change of username, email & password */}
        {renderChangeProfileInfoModal()}
      </div>
    </ProfileWrapper>
  );
}
