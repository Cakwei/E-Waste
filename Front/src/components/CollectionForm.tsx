import { useAuth } from "@/components/AuthProvider";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Clipboard } from "lucide-react";
import axios from "axios";
import { endPointUrl } from "@/lib/exports";
import FileInput from "./FileInput";
import type { FileWithPreview } from "@/hooks/FileInputHook";

export interface ICollectionForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  state: string;
  wasteDescription: string;
  img: FileWithPreview[];
}

export default function CollectionForm() {
  const auth = useAuth();

  const [formData, setFormData] = useState<ICollectionForm>({
    firstName: auth.user?.firstName || "",
    lastName: auth.user?.lastName || "",
    email: auth.user?.email || "",
    phoneNumber: "",
    building: "",
    streetAddress: "",
    city: "",
    state: "null",
    wasteDescription: "",
    img: [],
  });

  function handleInput(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (
        !(
          formData.firstName === "" &&
          formData.lastName === "" &&
          formData.email === "" &&
          formData.phoneNumber === "" &&
          formData.building === "" &&
          formData.streetAddress === "" &&
          formData.city === "" &&
          formData.state === "null" &&
          formData.wasteDescription === "" &&
          formData.img.length === 0
        )
      ) {
        const formInfo = new FormData();

        formInfo.append("firstName", formData.firstName);
        formInfo.append("lastName", formData.lastName);
        formInfo.append("email", formData.email);
        formInfo.append("phoneNumber", formData.phoneNumber);
        formInfo.append("building", formData.building);
        formInfo.append("streetAddress", formData.streetAddress);
        formInfo.append("city", formData.city);
        formInfo.append("state", formData.state);
        formInfo.append("wasteDescription", formData.wasteDescription);
        for (let i = 0; i < formData.img.length; i++) {
          formInfo.append("img", formData.img[i].file as File);
        }
        const result = await axios.post(
          `${endPointUrl}/waste-collection/create`,
          formInfo,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <div className="min-w-[324px] font-light min-[324px]:h-[calc(100vh-64px-250px)] sm:h-[calc(100vh-64px-192px)] md:h-auto">
        <div className="flex items-center justify-center bg-[#08948c] p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl sm:p-8">
            {/* Company Logo and Title */}
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-green-300 bg-green-50">
                {/* Using a simple SVG for the logo placeholder */}
                <Clipboard className="size-15 text-2xl" color="#00a63e" />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                Waste Pickup Request Form
              </h1>
            </div>

            {/* Form Section */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              encType={"multipart/form-data"}
              className="space-y-4"
            >
              {/* Name Section */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-100 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    value={auth.user?.firstName || formData.firstName}
                    name="firstName"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-100 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    value={auth.user?.lastName || formData.lastName}
                    name="lastName"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-100 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  value={auth.user?.email || formData.email}
                  name="email"
                  onChange={(e) => handleInput(e)}
                  required
                />
              </div>
              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  placeholder="### ### ####"
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) => handleInput(e)}
                  required
                />
              </div>
              {/* Waste Location Building */}
              <div>
                <label
                  htmlFor="building"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Waste Collection Pickup Address
                </label>
                <input
                  type="text"
                  id="building"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  value={formData.building}
                  name="building"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              {/* Street Address */}
              <div>
                <label
                  htmlFor="streetAddress"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  value={formData.streetAddress}
                  name="streetAddress"
                  onChange={(e) => handleInput(e)}
                  required
                />
              </div>
              {/* City and Country */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    value={formData.city}
                    name="city"
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    defaultValue="null"
                    name="state"
                    onChange={(e) => handleInput(e)}
                    className="select mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  >
                    <option
                      disabled
                      value="null"
                      className="rounded-md bg-zinc-200"
                    >
                      Pick a state
                    </option>
                    <option value="johor">Johor</option>
                    <option value="kedah">Kedah</option>
                    <option value="kelantan">Kelantan</option>
                    <option value="melaka">Malacca</option>
                    <option value="negeri_sembilan">Negeri Sembilan</option>
                    <option value="pahang">Pahang</option>
                    <option value="penang">Penang</option>
                    <option value="perak">Perak</option>
                    <option value="perlis">Perlis</option>
                    <option value="selangor">Selangor</option>
                    <option value="terengganu">Terengganu</option>
                    <option value="sabah">Sabah</option>
                    <option value="sarawak">Sarawak</option>
                    <option value="kuala_lumpur">Kuala Lumpur</option>
                    <option value="labuan">Labuan</option>
                    <option value="putrajaya">Putrajaya</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="wasteDescription"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Waste Origin Classification/Description
                </label>
                <textarea
                  id="wasteDescription"
                  rows={4}
                  className="mt-1 block min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  value={formData.wasteDescription}
                  name="wasteDescription"
                  onChange={(e) => handleInput(e)}
                ></textarea>
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700">
                  Photo upload (Optional)
                </div>
                <div className="text-error mb-1 block text-xs font-medium">
                  [Only a showcase in frontend due to requiring payment for
                  object storage]
                </div>
                <FileInput
                  callback={(data) => setFormData({ ...formData, img: data })}
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
