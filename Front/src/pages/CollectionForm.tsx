import Header from "../components/Header";
import Footer from "../components/Footer";
import { url, useAuth } from "@/components/AuthProvider";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Clipboard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface ICollectionForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  building: string;
  streetAddress: string;
  city: string;
  country: string;
  wasteDescription: string;
}

export default function CollectionForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      alert("You are not logged in");
      navigate("/");
    }
  }, [auth.user]);

  const [formData, setFormData] = useState<ICollectionForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    building: "",
    streetAddress: "",
    city: "",
    country: "null",
    wasteDescription: "",
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

  useEffect(() => {
    if (
      auth.user?.username === "" &&
      auth.token === "" &&
      auth.user?.email === "" &&
      !auth.loading
    ) {
      navigate("/login");
    }
  }, [auth]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${url}/waste-collection/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <Header />
      <div className="mt-[64px] min-w-[324px] font-light min-[324px]:h-[calc(100vh-64px-250px)] sm:h-[calc(100vh-64px-192px)] md:h-auto">
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
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    value={formData.firstName}
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                    value={formData.lastName}
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
                  value={formData.email}
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

                  <Select>
                    <SelectTrigger className="select mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="h-50">
                      <SelectItem value="johor">Johor</SelectItem>
                      <SelectItem value="kedah">Kedah</SelectItem>
                      <SelectItem value="kelantan">Kelantan</SelectItem>
                      <SelectItem value="melaka">Malacca</SelectItem>
                      <SelectItem value="negeri_sembilan">
                        Negeri Sembilan
                      </SelectItem>
                      <SelectItem value="pahang">Pahang</SelectItem>
                      <SelectItem value="penang">Penang</SelectItem>
                      <SelectItem value="perak">Perak</SelectItem>
                      <SelectItem value="perlis">Perlis</SelectItem>
                      <SelectItem value="selangor">Selangor</SelectItem>
                      <SelectItem value="terengganu">Terengganu</SelectItem>
                      <SelectItem value="sabah">Sabah</SelectItem>
                      <SelectItem value="sarawak">Sarawak</SelectItem>
                      <SelectItem value="kuala_lumpur">Kuala Lumpur</SelectItem>
                      <SelectItem value="labuan">Labuan</SelectItem>
                      <SelectItem value="putrajaya">Putrajaya</SelectItem>
                    </SelectContent>
                  </Select>
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
        <Footer />
      </div>
    </div>
  );
}
