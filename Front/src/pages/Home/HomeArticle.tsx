import trash1 from "@/assets/trash1.png";
import greenEnv from "@/assets/greenEnv.jpg";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import AboutUs from "@/pages/Home/About";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type ILocation = {
  office: string;
  approx_coordinates: LatLngExpression;
  city: string;
};

const info = [
  { label: "1k E-Waste Recycled", href: "#" },
  { label: "2k E-Waste Recycled", href: "#" },
  { label: "3k E-Waste Recycled", href: "#" },
];
const accordion = [
  {
    question: "Is the system fully built and finished?",
    answer: "No, I will finish it as soon possible though.",
  },
  {
    question: "What if there is a bug in the system?",
    answer: "Please do report @ charleetan2020@gmail.com if you do. :)",
  },
  {
    question: "What are future features to be added?",
    answer: "For now, I am not sure, sorry.",
  },
];

const location: ILocation[] = [
  {
    office: "Volt Recycle | E-Waste Recycling Kuala Lumpur & Selangor Malaysia",
    approx_coordinates: [3.140853, 101.693207],
    city: "Kuala Lumpur",
  },
  {
    office: "TechWaste Recycling Malaysia",
    approx_coordinates: [2.9782, 101.7068],
    city: "Seri Kembangan",
  },
  {
    office: "ERTH: Electronic Recycling Through Heroes (E-waste)",
    approx_coordinates: [2.9213, 101.6558],
    city: "Cyberjaya",
  },
  {
    office: "PJ Eco Recycling Plaza",
    approx_coordinates: [3.127887, 101.59449],
    city: "Petaling Jaya",
  },
  {
    office: "Mudajaya Recycle Sdn Bhd",
    approx_coordinates: [2.9782, 101.7068],
    city: "Seri Kembangan / Balakong",
  },
];

export default function HomeArticle() {
  return (
    <article className="flex w-full flex-col p-10 text-white">
      <ul className="flex w-full flex-wrap justify-center gap-5">
        {info.map((item) => (
          <li
            key={item.href}
            className="flex w-full max-w-[300px] basis-[95%] justify-center rounded-lg bg-[#f9f9f9] py-5 text-black sm:w-max"
          >
            <div className="flex w-full flex-col items-center sm:w-max">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={trash1}
                className="w-50"
              />
              <span className="text-center font-bold">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
      <AboutUs />
      <div className="my-10 flex w-full max-w-[1500px] flex-col items-center gap-5 self-center rounded-tl-2xl rounded-br-2xl bg-[#056b66] p-5 min-[1920px]:max-w-[1920px] sm:flex-row">
        <img src={greenEnv} className="w-50 rounded-[50%] outline-2" />
        <h5 className="sm:text-st flex flex-col items-center justify-center gap-5 text-center text-2xl font-bold sm:items-start sm:text-start">
          Wish to take part in our journey for a greener future?
          <NavLink
            to="/recycle"
            className="btn w-max gap-2.5 border-none bg-[#30b4ac] text-white shadow-none outline-none"
          >
            Request for waste collection <i className="bi bi-arrow-right"></i>
          </NavLink>
        </h5>
      </div>
      <div className="mb-10 flex w-full max-w-[1500px] flex-wrap self-center min-[1920px]:max-w-[1920px] sm:flex-nowrap">
        <section className="flex w-full flex-col gap-2.5 py-5 text-black sm:basis-[40%] sm:p-5">
          <h4 className="badge rounded-3xl border border-zinc-400 p-2.5">
            Questions
          </h4>
          <div>
            <h3 className="text-3xl font-extrabold uppercase">
              Frequently Asked Questions
            </h3>
            <h3 className="text-sm">
              We provide answers to common questions that you may have.
            </h3>
          </div>
        </section>
        <section className="flex w-full items-center justify-center text-black sm:basis-[60%]">
          <Accordion type="single" collapsible className="w-full">
            {accordion.map((item, index) => (
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
      <div className="">
        <h1 className="text-3xl font-extrabold text-black uppercase">
          Available Send-Off Locations
        </h1>
        <MapContainer
          className="z-0 h-[450px] sm:h-[250px]"
          center={[3.140853, 101.693207]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location.map((item, index) => (
            <Marker position={item.approx_coordinates} key={index}>
              <Popup>
                <div className="p-2.5">
                  <div className="text-center">{item.office}</div>
                  <span className="divider my-0"></span>{" "}
                  <div className="text-center">{item.city}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <span className="text-xs font-normal text-black normal-case">
          (NOTE: Data in map is not entirely real)
        </span>
      </div>
    </article>
  );
}
