export default function AboutUs() {
  return (
    <div className="mt-10 flex flex-wrap gap-5 [text-align-last:center]">
      <div className="rounded-2xl p-5 text-justify text-black outline outline-zinc-300">
        <h1 className="text-center text-4xl font-bold text-[#08948c]">About</h1>
        <p>
          We are dedicated to creating a cleaner, healthier planet by
          revolutionizing e-waste management. We offer comprehensive,
          environmentally sound solutions for individuals, businesses, and
          communities facing the challenge of responsible electronic waste
          disposal.
        </p>
      </div>

      <div className="rounded-2xl p-5 text-justify text-black outline outline-zinc-300">
        <h1 className="text-center text-4xl font-bold text-[#08948c]">
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
