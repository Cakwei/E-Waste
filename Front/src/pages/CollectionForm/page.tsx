import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CollectionFormComp from "@/components/CollectionForm";
export default function CollectionForm() {
  return (
    <>
      <Header />
      <div className="mt-[64px]">
        <CollectionFormComp />
        <Footer />
      </div>
    </>
  );
}
