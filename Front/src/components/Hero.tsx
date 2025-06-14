import { useNavigate } from "react-router";
import heroImg from "../assets/heroImg.svg";
import { motion } from "motion/react";
export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-[calc(100vh-64px)] max-h-[450px] min-h-[250px] w-full items-center justify-center bg-transparent min-[500px]:h-[calc(75vh-64px)] sm:h-[calc(50vh-64px)] lg:max-h-[400px]">
      <div className="absolute z-[2] flex flex-col gap-2.5 text-center">
        <h1 className="px-5 text-4xl font-extrabold text-black">
          Electronic Waste Recycling Program
        </h1>
        <h3 className="text-md font-semibold">
          Got items you want to ditch? We can help you!
        </h3>
        <div className="flex w-full justify-center gap-5">
          <motion.button
            initial={{ x: -10 }}
            animate={{ x: 0, transition: { duration: 0.55 } }}
            onClick={() => navigate("/profile")}
            className="btn border-none bg-[#08948c] font-normal text-white outline-none"
          >
            Recycle
          </motion.button>
          <motion.button
            initial={{ x: 10 }}
            animate={{ x: 0, transition: { duration: 0.55 } }}
            className="btn border-none bg-[#30b4ac] font-normal text-white outline-none"
          >
            Learn More
          </motion.button>
        </div>
      </div>
      <img
        src={heroImg}
        className="absolute inset-0 top-0 z-[1] h-[inherit] max-h-[450px] min-h-[inherit] w-full object-cover object-center opacity-25 grayscale lg:max-h-[400px]"
      />
    </div>
  );
}
