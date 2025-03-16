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
    <section className="bg-[#F6F5F1] pt-20 pb-32 relative">
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
          className="w-[80%] lg:w-3/4 mx-auto bg-white p-8 mt-12 rounded-xl "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="lg:text-xl text-base text-text">
              How do I know I can trust BrainZap?
            </AccordionTrigger>
            <AccordionContent className="list-disc lg:text-lg text-sm text-text">
              <li>
                Reliable AI Technology – Our AI generates quizzes based on
                verified sources to ensure accuracy and engagement.
              </li>
              <li>
                Privacy & Security – We follow strict data protection policies
                and never share your personal information with third parties.
              </li>
              <li>
                Active Support – Our team is always available to address any
                concerns and continuously enhance your experience.
              </li>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="lg:text-xl text-base text-text">
              How will you keep my data private?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg text-sm text-text">
              This platform can ensure you that, your data is fully secure with
              the organization. Only you can access your data. After successful
              login we verify the users credentials with the cookies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="lg:text-xl tex-base text-text">
              Do you have a free trial?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg text-sm text-text">
              Yes, we do have a free trial in timed mode of our quiz. A logged
              in user can play a demo exam for the first time to test himself.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="lg:text-xl text-base text-text">
              What kind of people can use this app?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg text-sm text-text">
              <li>Students can prepare for a programming related challenge.</li>
              <li>Self learners can improve their coding skill.</li>
              <li>Professionals can seek deep knowledge about AI.</li>
              <li>
                Training program can asses their students through this web app.
              </li>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="lg:text-xl text-base text-text">
              Do we have the premium version of BrainZap?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg text-sm text-text">
              Yes, for all the users we have some premium quizzes for better
              user experience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
