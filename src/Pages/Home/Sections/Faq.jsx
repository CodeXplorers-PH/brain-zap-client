import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Lottie from "lottie-react";
import animationData from "../../../assets/animation/faq.json";

const Faq = () => {
  return (
    <section className="bg-[#090909] pt-20 pb-32 relative">
      {/* Heading */}
      <SectionHeading
        heading="FAQ"
        subHeading="Everything You Need to Know About BrainZap, How Our AI Creates Engaging Quizzes"
      />
      <div>
        {/* FAQ animation */}
        <div className="absolute lg:right-20 right-0 lg:top-37 top-45">
          <Lottie
            style={{ width: 100, height: 100 }}
            animationData={animationData}
            loop={true}
          />
        </div>
        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-[80%] lg:w-3/4 space-y-5 mx-auto bg-white/10 backdrop-blur-lg text-white  p-8 mt-12 rounded-xl "
        >
          <AccordionItem
            value="item-1"
            className="border border-gray-700 rounded-lg overflow-hidden  bg-[#222] shadow-2xl"
          >
            <AccordionTrigger className="lg:text-xl text-base text-white px-4 py-3">
              How do I know I can trust BrainZap?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-gray-300 bg-gray-800 p-4 rounded-b-lg">
              <ul className="space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-blue-400">
                    Reliable AI Technology –
                  </span>{" "}
                  Our AI generates quizzes based on verified sources to ensure
                  accuracy and engagement.
                </li>
                <li>
                  <span className="font-semibold text-green-400">
                    Privacy & Security –
                  </span>{" "}
                  We follow strict data protection policies and never share your
                  personal information with third parties.
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">
                    Active Support –
                  </span>{" "}
                  Our team is always available to address any concerns and
                  continuously enhance your experience.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-gray-700 rounded-lg overflow-hidden  bg-[#222] shadow-2xl"
          >
            <AccordionTrigger className="lg:text-xl text-base text-white px-4 py-3">
              How will you keep my data private?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-gray-300 bg-gray-800 p-4 rounded-b-lg">
              <ul className="space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-blue-400">
                    Reliable AI Technology –
                  </span>{" "}
                  Our AI generates quizzes based on verified sources to ensure
                  accuracy and engagement.
                </li>
                <li>
                  <span className="font-semibold text-green-400">
                    Privacy & Security –
                  </span>{" "}
                  We follow strict data protection policies and never share your
                  personal information with third parties.
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">
                    Active Support –
                  </span>{" "}
                  Our team is always available to address any concerns and
                  continuously enhance your experience.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-gray-700 rounded-lg overflow-hidden  bg-[#222] shadow-2xl"
          >
            <AccordionTrigger className="lg:text-xl text-base text-white px-4 py-3">
              Do you have a free trial?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-gray-300 bg-gray-800 p-4 rounded-b-lg">
              <ul className="space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-blue-400">
                    Reliable AI Technology –
                  </span>{" "}
                  Our AI generates quizzes based on verified sources to ensure
                  accuracy and engagement.
                </li>
                <li>
                  <span className="font-semibold text-green-400">
                    Privacy & Security –
                  </span>{" "}
                  We follow strict data protection policies and never share your
                  personal information with third parties.
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">
                    Active Support –
                  </span>{" "}
                  Our team is always available to address any concerns and
                  continuously enhance your experience.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border border-gray-700 rounded-lg overflow-hidden  bg-[#222] shadow-2xl"
          >
            <AccordionTrigger className="lg:text-xl text-base text-white px-4 py-3">
              What kind of people can use this app?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-gray-300 bg-gray-800 p-4 rounded-b-lg">
              <ul className="space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-blue-400">
                    Reliable AI Technology –
                  </span>{" "}
                  Our AI generates quizzes based on verified sources to ensure
                  accuracy and engagement.
                </li>
                <li>
                  <span className="font-semibold text-green-400">
                    Privacy & Security –
                  </span>{" "}
                  We follow strict data protection policies and never share your
                  personal information with third parties.
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">
                    Active Support –
                  </span>{" "}
                  Our team is always available to address any concerns and
                  continuously enhance your experience.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border border-gray-700 rounded-lg overflow-hidden  bg-[#222] shadow-2xl"
          >
            <AccordionTrigger className="lg:text-xl text-base text-white px-4 py-3">
              Do we have the premium version of BrainZap?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-gray-300 bg-gray-800 p-4 rounded-b-lg">
              <ul className="space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-blue-400">
                    Reliable AI Technology –
                  </span>{" "}
                  Our AI generates quizzes based on verified sources to ensure
                  accuracy and engagement.
                </li>
                <li>
                  <span className="font-semibold text-green-400">
                    Privacy & Security –
                  </span>{" "}
                  We follow strict data protection policies and never share your
                  personal information with third parties.
                </li>
                <li>
                  <span className="font-semibold text-yellow-400">
                    Active Support –
                  </span>{" "}
                  Our team is always available to address any concerns and
                  continuously enhance your experience.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
