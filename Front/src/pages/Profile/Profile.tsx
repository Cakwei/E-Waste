import axios from "axios";
import { MailWarning, Pencil, X } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/Dialog";
import { toast } from "sonner";
/*
type IFormData = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};*/

type profileInput = {
  field: "username" | "email" | "password" | null;
};

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    usernameDialog: false,
    emailDialog: false,
    passwordDialog: false,
  });

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
  const [renderModalType, setRenderModalType] =
    useState<profileInput["field"]>(null);

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

  function openDialog(field: profileInput["field"]) {
    switch (field) {
      case "username":
        setDialog(() => ({
          usernameDialog: true,
          emailDialog: false,
          passwordDialog: false,
        }));
        return;
      case "email":
        setDialog(() => ({
          usernameDialog: false,
          emailDialog: true,
          passwordDialog: false,
        }));
        return;
      case "password":
        setDialog(() => ({
          usernameDialog: false,
          emailDialog: false,
          passwordDialog: true,
        }));
        return;
      default:
        throw Error(
          "Invalid field name, choose between username, email & password.",
        );
    }
  }

  function renderChangeProfileInfoModal(field: profileInput["field"]) {
    switch (field) {
      case "username":
        return (
          <Dialog
            open={dialog.usernameDialog}
            onOpenChange={(open) =>
              setDialog((prev) => ({
                ...prev,
                usernameDialog: open,
              }))
            }
          >
            <form>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit username</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile username here. Click save when
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-0.5">
                    <label className="text-sm">Current Username</label>
                    <Input
                      onChange={(e) => handleInput(e, "username")}
                      id="name-1"
                      name="currentUsername"
                      placeholder="Cakwei"
                    />
                  </div>
                  <div className="grid gap-0.5">
                    <label className="text-sm">New Username</label>
                    <Input
                      onChange={(e) => handleInput(e, "username")}
                      id="username-1"
                      name="newUsername"
                      placeholder="CakweiTiao"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-[#08948c]"
                    onClick={() => {
                      toast.error("ddd", {
                        style: {
                          // color: "red",
                          // display: "flex",
                        },
                        classNames: {
                          title: "ml-2.5",
                        },
                        position: "top-center",
                        icon: <MailWarning color="black" />,
                      });
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      case "email":
        return (
          <Dialog
            open={dialog.emailDialog}
            onOpenChange={(open) =>
              setDialog((prev) => ({
                ...prev,
                emailDialog: open,
              }))
            }
          >
            <form>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit email address</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-0.5">
                    <label className="text-sm">Current email address</label>
                    <Input
                      onChange={(e) => handleInput(e, "email")}
                      id="name-1"
                      name="currentEmail"
                      placeholder="dummy1@gmail.com"
                    />
                  </div>
                  <div className="grid gap-0.5">
                    <label className="text-sm">New email address</label>
                    <Input
                      onChange={(e) => handleInput(e, "email")}
                      id="username-1"
                      name="newEmail"
                      placeholder="dummy2@gmail.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-[#08948c]">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );

      case "password":
        return (
          <Dialog
            open={dialog.passwordDialog}
            onOpenChange={(open) =>
              setDialog((prev) => ({
                ...prev,
                passwordDialog: open,
              }))
            }
          >
            <form>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit password</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-0.5">
                    <label className="text-sm">Current password</label>
                    <Input
                      onChange={(e) => handleInput(e, "password")}
                      id="name-1"
                      name="currentPassword"
                      placeholder="********"
                    />
                  </div>
                  <div className="grid gap-0.5">
                    <label className="text-sm">New password</label>
                    <Input
                      onChange={(e) => handleInput(e, "password")}
                      id="username-1"
                      name="newPassword"
                      placeholder="********"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-[#08948c]">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      default:
        return;
      // Don't change here or it will not load UI
    }
  }

  async function handleInput(
    e: ChangeEvent<HTMLInputElement>,
    field: profileInput["field"],
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
        setChangeEmailInputValue((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;

      case "password":
        setChangePasswordInputValue((prev) => ({
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

  useEffect(() => {
    console.log(
      JSON.stringify(changeUsernameInputValue),
      JSON.stringify(changeEmailInputValue),
      JSON.stringify(changePasswordInputValue),
    );
  }, [
    setChangeEmailInputValue,
    setChangeUsernameInputValue,
    setChangePasswordInputValue,
    changeEmailInputValue,
    changeUsernameInputValue,
    changePasswordInputValue,
  ]);
  return (
    <ProfileWrapper>
      <div className="flex w-full justify-start bg-gray-50 p-5">
        <div className="flex h-max w-full flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-5 pb-7.5 shadow-md transition-shadow duration-300 hover:shadow-lg md:max-w-[650px]">
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
                      openDialog("username");
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
                      openDialog("email");
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
                      openDialog("password");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal dialog for change of username, email & password */}
        {renderChangeProfileInfoModal(renderModalType)}
      </div>
    </ProfileWrapper>
  );
}
