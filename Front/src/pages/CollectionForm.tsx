import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <div className="mt-[64px] min-w-[324px] font-[montserrat] font-light">
        <Hero />
        <Footer />
      </div>
    </>
  );
}
