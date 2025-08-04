import ProfileComponent from "@/pages/Profile/component/ProfileWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { accordion, featureCards } from "@/constants/constants";

export default function Support() {
  return (
    <ProfileComponent>
      <div className="pb-[64px] md:pb-0">
        <h1 className="bg-gray-50 p-5 text-4xl font-bold uppercase">
          Need assistance?
        </h1>
        <div className="flex flex-col items-center justify-center bg-gray-50 p-5 font-sans">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((Card) => (
                <div
                  key={Card.title}
                  className="flex min-h-[180px] flex-col items-start rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg"
                >
                  <div className="mb-4">
                    <Card.icon
                      color="#056b66"
                      className="h-8 w-8 text-blue-600"
                    ></Card.icon>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {Card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {Card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h1 className="bg-gray-50 p-5 text-4xl font-bold uppercase">
          FAQ Section
        </h1>
        <div className="rounded-md bg-gray-50 p-5 px-5">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-2.5"
          >
            {accordion.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-md px-2.5 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </ProfileComponent>
  );
}
