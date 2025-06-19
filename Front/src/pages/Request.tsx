import { X } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { endPointUrl } from "@/lib/exports";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import CollectionForm from "@/components/CollectionForm";
import ProfileComponent from "@/components/ProfileComponent";

type IRequest = {
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
  images: string;
  creationDate: string;
  status: string;
};

export default function Request() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [data, setData] = useState<IRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    try {
      if (
        !auth.loading &&
        auth.user?.username !== "" &&
        auth.user?.email !== ""
      ) {
        setLoading(true);
        const result = await axios.post(
          `${endPointUrl}/waste-collection/user/${auth.user?.username}`,
          { username: auth.user?.username },
          { withCredentials: true },
        );
        if (result.data.result) {
          setData(result.data.message);
          /* const convertedImagesStringOfArray = Buffer.Buffer.from(
            result.data.message.images.data,
          ).toString("utf-8");
          const convertedImagesArray = JSON.parse(convertedImagesStringOfArray);
          if (result.data.result === true) {
            // setImage(convertedImagesArray);
          }*/
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(data, loading);
  }, [auth]);

  function selectBadge(data: { status: string }) {
    switch (data.status) {
      case "created":
        return (
          <div className="badge badge-success p-1.5 font-semibold text-white">
            Created
          </div>
        );
      case "picked_up":
        return (
          <div className="badge badge-success p-1.5 font-semibold text-white">
            Picked Up
          </div>
        );
    }
  }
  return (
    <ProfileComponent>
      <div className="flex h-dvh w-full flex-col bg-gray-50 p-5 font-sans md:h-full">
        <div className="flex max-w-[1080px] flex-col items-start gap-2.5 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <h1 className="text-2xl font-semibold">Collection Requests</h1>
          <div className="flex justify-between">
            <button
              onClick={() => {
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal();
              }}
              className="btn border-none bg-[#028b85] font-normal text-white"
            >
              Create New Request
            </button>
          </div>
          <section
            className={`${data && data.length > 0 ? "max-h-[calc(100dvh-250px)]" : ""} w-full overflow-scroll rounded-2xl outline`}
          >
            <Table>
              <TableCaption>A list of your recent requests.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow className="relative h-[27px] w-full">
                    <TableCell>
                      <span className="loading loading-spinner loading-md absolute left-[50%] flex translate-x-[-50%] justify-center py-2.5"></span>
                    </TableCell>
                  </TableRow>
                ) : data && data.length >= 1 ? (
                  data?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{selectBadge(item)}</TableCell>
                      <TableCell>
                        {new Date(item.creationDate).getDate() +
                          "-" +
                          new Date(item.creationDate).getMonth() +
                          "-" +
                          new Date(item.creationDate).getFullYear()}
                      </TableCell>
                      <TableCell className="">
                        <button
                          onClick={() => {
                            navigate(`/profile/request/${item.id}`);
                          }}
                          className="btn btn-primary max-h-[30px] border-none bg-[#30b4ac] font-normal shadow-none"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="relative h-[27px] w-full">
                    <TableCell>
                      <span className="absolute left-[50%] flex translate-x-[-50%] justify-center py-2.5">
                        You have no submitted collection requests.
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>

          {/* Modal for new request */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box my-5 flex min-h-[90%] flex-col gap-2.5 md:max-h-[90%] md:min-w-[650px]">
              <div className="flex justify-end gap-2.5">
                <X
                  onClick={() => {
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    ).close();
                  }}
                  className="rounded-[50%] p-1 text-zinc-400 transition-all duration-300 hover:bg-zinc-300 hover:text-white"
                  size={35}
                />
              </div>
              <CollectionForm />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button className="hover:cursor-default">close</button>
            </form>
          </dialog>

          {/* Modal for view
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Submitted Request Details</h3>
            <p className="py-4">{JSON.stringify(viewData)}</p>
          </div>
          <form method="dialog" className="modal-backdrop hover:cursor-default">
            <button className="hover:cursor-default">close</button>
          </form>
        </dialog> */}
        </div>
      </div>
    </ProfileComponent>
  );
}
