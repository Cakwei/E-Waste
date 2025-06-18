import { useAuth } from "@/components/AuthProvider";
import ProfileComponent, { type IRequest } from "@/components/ProfileComponent";
import { endPointUrl } from "@/lib/exports";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewRequest() {
  const [data, setData] = useState<IRequest | null>(null);
  const auth = useAuth();
  useEffect(() => {
    const isLoggedIn =
      !auth.loading && auth.user?.username !== "" && auth.user?.email !== "";
    if (isLoggedIn) {
      fetchData();
    }
  }, [auth]);

  async function fetchData() {
    try {
      if (
        !auth.loading &&
        auth.user?.username !== "" &&
        auth.user?.email !== ""
      ) {
        const result = await axios.post(
          `${endPointUrl}/waste-collection/${auth.user?.username}`,
          {},
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ProfileComponent>
      <div className="flex w-full justify-start bg-gray-50 p-5">
        <form className="flex h-max w-full flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-5 pb-7.5 shadow-md transition-shadow duration-300 hover:shadow-lg md:max-w-[650px]"></form>
      </div>
    </ProfileComponent>
  );
}
