import Hero from "./component/Hero";
import HomeArticle from "./component/HomeArticle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="mt-[64px] min-w-[324px] font-[montserrat] font-light">
        <Hero />
        <HomeArticle />
        <Footer />
      </div>
    </>
  );
}
