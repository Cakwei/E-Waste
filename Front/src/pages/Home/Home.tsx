import Hero from "./Hero";
import HomeArticle from "./HomeArticle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export interface IStyle {
  className?: React.HTMLAttributes<HTMLElement | string> | string;
}
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
