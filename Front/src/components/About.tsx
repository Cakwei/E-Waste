export default function AboutUs() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-5 [text-align-last:center] sm:flex-nowrap">
      <div className="flex max-w-[300px] basis-[100%] flex-col items-center gap-2.5 rounded-2xl p-5 text-justify text-black outline outline-zinc-300 sm:basis-[50%]">
        <h1 className="badge rounded-4xl border border-[#08948c] p-2.5 text-center text-xl font-semibold text-[#08948c]">
          About
        </h1>
        <p>
          We are dedicated to creating a cleaner, healthier planet by
          revolutionizing e-waste management. We offer comprehensive,
          environmentally sound solutions for individuals, businesses, and
          communities facing the challenge of responsible electronic waste
          disposal.
        </p>
      </div>

      <div className="flex w-full max-w-[300px] basis-[100%] flex-col items-center gap-2.5 rounded-2xl p-5 text-justify text-black outline outline-zinc-300 sm:basis-[50%]">
        <h1 className="badge rounded-4xl border border-[#08948c] p-2.5 text-center text-xl font-semibold text-[#08948c]">
          Vision
        </h1>
        <p>
          Our vision is a world free from the environmental burden of e-waste,
          where every discarded electronic device is responsibly recycled, its
          valuable materials recovered, and hazardous components safely
          neutralized, contributing to a circular economy.
        </p>
      </div>
    </div>
  );
}
