import { useAuth } from "@/context/AuthProvider";
import ProfileComponent from "@/pages/Profile/ProfileWrapper";
import { endPointUrl } from "@/lib/exports";
import axios, { type AxiosResponse } from "axios";
import { Copy, TriangleAlert, UserPen } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import Buffer from "buffer/";
import { ImageZoom } from "@/components/ImageZoom";
import { io } from "socket.io-client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Button } from "@/components/Button";

const socket = io(endPointUrl);

type IData = {
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
};

export default function ViewRequest() {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const auth = useAuth();

  async function fetchData() {
    try {
      if (
        !auth.loading &&
        auth.user?.username !== "" &&
        auth.user?.email !== ""
      ) {
        setLoading(true);
        const id = window.location.href.split(
          `${import.meta.env.VITE_WEB_URL}/profile/request/`,
        )[1];
        const result = await axios.post(
          `${endPointUrl}/waste-collection/collection/${id}`,
          { id: id },
          { withCredentials: true, timeout: 5000 },
        );
        if (result.data.result) {
          let data = result.data.message;
          data = {
            ...data,
            images: JSON.parse(
              Buffer.Buffer.from(result.data.message.images).toString("utf-8"),
            ),
          };
          setData(data);
        } else {
          navigate("/");
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const isLoggedIn = auth.user?.username !== "" && auth.user?.email !== "";
    if (isLoggedIn && !auth.loading) {
      fetchData();
    } else if (!isLoggedIn && !auth.loading) {
      navigate("/login");
    }
  }, [auth, data?.id, navigate]);

  return (
    <ProfileComponent>
      {loading ? (
        <div className="flex w-full flex-col gap-4 p-5 md:max-w-[650px]">
          <div className="skeleton h-100 w-full bg-zinc-300"></div>
          <div className="skeleton h-10 w-28 bg-zinc-300"></div>
          <div className="skeleton h-10 w-full bg-zinc-300"></div>
          <div className="skeleton h-10 w-full bg-zinc-300"></div>
        </div>
      ) : (
        <div className="w-full p-5 pb-[calc(64px+20px)] md:pb-5">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
            <header className="flex flex-col items-start justify-between rounded-t-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-white sm:flex-row sm:items-center">
              <button
                onClick={() => navigate("/profile/request")}
                className="mb-3 flex items-center text-sm font-semibold hover:underline sm:mb-0"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Back to Requests
              </button>
              <h1 className="text-center text-xl font-bold sm:text-3xl">
                Waste Collection Request
              </h1>
              <span className="max-w-[150px] overflow-hidden font-bold text-nowrap text-ellipsis text-green-200">
                #{data?.id}
              </span>
            </header>

            <main className="p-6 md:p-8">
              <RequestOverview id={data?.id} />

              <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h2 className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800">
                  Collection Location
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      Building:
                    </label>
                    <span className="text-base text-gray-800">
                      {data?.building}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      Street Address:
                    </label>
                    <span className="text-base text-gray-800">
                      {data?.streetAddress}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      City:
                    </label>
                    <span className="text-base text-gray-800">
                      {data?.city}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      State:
                    </label>
                    <div className="flex items-center text-base text-gray-800">
                      <span>Selangor</span>
                      <a
                        href="#"
                        className="ml-2 text-green-600 transition-colors hover:text-green-800"
                        title="View on Map"
                      >
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-map-pin"
                        >
                          <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z" />
                          <circle cx="12" cy="8" r="2" />
                        </svg> */}
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h2 className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800">
                  Requester Contact
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      Name:
                    </label>
                    <span className="overflow-hidden text-base text-ellipsis text-gray-800">
                      {data?.firstName} {data?.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      Email:
                    </label>
                    <a
                      href="mailto:charleetan2020@gmail.com"
                      className="overflow-hidden text-base text-ellipsis text-blue-600 hover:underline"
                    >
                      {data?.email}
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-600">
                      Phone Number:
                    </label>
                    <a className="overflow-hidden text-base text-ellipsis text-blue-600 hover:underline">
                      {data?.phoneNumber}
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h2 className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800">
                  Waste Details
                </h2>
                <div className="mb-6 flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-600">
                    Description:
                  </label>
                  <p className="min-h-[80px] rounded-md border border-gray-300 bg-white p-3 text-base whitespace-pre-wrap text-gray-800">
                    {data?.wasteDescription}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="mb-3 text-sm font-medium text-gray-600">
                    Attached Images:
                  </label>
                  <div className="flex gap-4 overflow-x-auto p-2">
                    {data?.images && data?.images.length > 0 ? (
                      data?.images.map((item) => (
                        <ImageZoom
                          key={item}
                          className="w-35 flex-shrink-0 cursor-pointer overflow-hidden border border-gray-300 bg-cover object-cover shadow-sm transition-shadow hover:shadow-md"
                        >
                          <img
                            src={item}
                            alt="E-waste item 1"
                            className="bg-cover object-cover"
                          />
                        </ImageZoom>
                      ))
                    ) : (
                      <p className="text-gray-500">No images provided.</p>
                    )}
                  </div>
                </div>
              </section>
              <ActionsBtnSection id={data?.id} />
            </main>
          </div>
          <div></div>
        </div>
      )}
    </ProfileComponent>
  );
}
type IRequestData = {
  status: string;
  agentInCharge: string;
  creationDate: string;
  id: string;
};
function RequestOverview({ id }: { id: string | undefined }) {
  const [data, setData] = useState<IRequestData | null>(null);
  async function fetchData() {
    const result = await axios.post(
      `${endPointUrl}/waste-collection/collection/${id}`,
      {
        id: id,
      },
      { withCredentials: true },
    );
    if (result.data.result) {
      const { status, agentInCharge, creationDate } = result.data.message;
      setData({
        status: status,
        agentInCharge: agentInCharge,
        creationDate: creationDate,
        id: id!,
      });
    }
  }

  function selectBadge(data: IRequestData | null) {
    switch (data?.status) {
      case "created":
        return (
          <span className="inline-block rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md">
            {data?.status &&
              data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
          </span>
        );
      case "pending":
        return (
          <span className="inline-block rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md">
            {data?.status &&
              data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-block rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md">
            {data?.status &&
              data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
          </span>
        );
    }
  }

  useEffect(() => {
    socket.on("updateViewRequest", async () => {
      fetchData();
    });

    return () => {
      socket.off("updateViewRequest");
    };
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <h2 className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800">
        Request Overview
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Request ID:
          </label>
          <div className="flex items-center rounded-md border border-gray-300 bg-white p-2 font-mono text-base text-gray-800 [user-select:all]">
            <span className="w-[calc(100%-75px)] overflow-hidden text-nowrap text-ellipsis">
              {data?.id}
            </span>
            <button className="ml-auto rounded-md p-1 transition-colors hover:bg-gray-200">
              <Copy
                size={15}
                onClick={() => {
                  if (data?.id) {
                    navigator.clipboard.writeText(data.id);
                  }
                }}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Status:
          </label>
          {selectBadge(data)}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Submitted On:
          </label>
          <span className="text-base text-gray-800">
            {data?.creationDate &&
              new Date(data?.creationDate).getDate() +
                "-" +
                new Date(data?.creationDate).getMonth() +
                "-" +
                new Date(data?.creationDate).getFullYear()}
          </span>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Agent In Charge:
          </label>
          <span className="text-base text-gray-800">
            {data?.agentInCharge ? (
              <span>{data?.agentInCharge}</span>
            ) : (
              <span>Not assigned</span>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

function ActionsBtnSection({ id }: { id: string | undefined }) {
  const auth = useAuth();
  const [data, setData] = useState<IRequestData | null>(null);
  async function fetchData() {
    const result = await axios.post(
      `${endPointUrl}/waste-collection/collection/${id}`,
      {
        id: id,
      },
      { withCredentials: true },
    );
    if (result.data.result) {
      const { id, status, agentInCharge, creationDate } = result.data.message;

      setData({
        status: status,
        agentInCharge: agentInCharge,
        creationDate: creationDate,
        id: id,
      });
    }
  }

  async function cancelRequest(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const result = (await updateCollectionRequest("cancel")) as AxiosResponse;
    if (result.data.result) {
      socket.emit("updateViewRequest");
    }
  }
  async function markRequestStatus(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const result = (await updateCollectionRequest("mark")) as AxiosResponse;
    if (result.data.result) {
      socket.emit("updateViewRequest");
    }
  }

  async function assignRequest(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const result = (await updateCollectionRequest(
      "assign",
      "agent",
    )) as AxiosResponse;
    if (result.data.result) {
      socket.emit("updateViewRequest");
    }
  }

  async function updateCollectionRequest(
    action: string,
    agentInCharge: string | undefined = undefined,
  ) {
    const id = data?.id;
    if (id) {
      try {
        const response = await axios.patch(
          `${endPointUrl}/waste-collection/collection/${id}`,
          {
            id: data?.id,
            action: action,
            agentInCharge: agentInCharge,
          },
          { withCredentials: true },
        );
        return response;
      } catch (error) {
        console.error(`Error updating collection request ${id}:`, error);
        throw error;
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    socket.on("updateViewRequest", async () => {
      fetchData();
    });

    return () => {
      socket.off("updateViewRequest");
    };
  }, [id]);

  return (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <h2 className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800">
        Actions
      </h2>
      <div className="flex flex-wrap gap-4">
        {auth.user?.role === "admin" ? (
          <>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    className={`focus:ring-opacity-75 h-auto ${data?.status === "cancelled" ? "btn-disabled" : ""} btn rounded-lg border-none bg-green-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-green-600`}
                  >
                    Mark as Pending Pickup
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Request Status to Pending</DialogTitle>
                    <DialogDescription>
                      Make sure all relevant information is given before
                      proceeding.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4"></div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={markRequestStatus}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    className={`focus:ring-opacity-75 h-auto ${data?.status === "cancelled" ? "btn-disabled" : ""} btn rounded-lg border-none bg-blue-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-blue-600`}
                  >
                    Assign Agent
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2.5 text-lg">
                      <UserPen size={22} />
                      Assign an Agent
                    </DialogTitle>
                    <DialogDescription>
                      <select
                        defaultValue="Pick a color"
                        className="select rounded-lg outline outline-zinc-300 focus:outline focus:outline-zinc-500"
                      >
                        <option disabled={true}>Pick a color</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                      </select>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4"></div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={assignRequest}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </>
        ) : (
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  className={`focus:ring-opacity-75 h-auto ${data?.status === "cancelled" ? "btn-disabled" : ""} btn rounded-lg border-none bg-red-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-red-700`}
                >
                  Cancel Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2.5">
                    <TriangleAlert size={22} color={"red"} />
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription>
                    Keep in mind that once cancelled, it cannot be reversed.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4"></div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={cancelRequest}
                    >
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        )}
      </div>
    </section>
  );
}
