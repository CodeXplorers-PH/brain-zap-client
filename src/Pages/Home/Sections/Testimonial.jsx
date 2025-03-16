import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/testimonialCard";
import { testimonialData } from "@/data/Testimonial";

const Testimonial = () => {
  return (
    <section className="bg-[#F6F5F1] pt-20 pb-32 relative">
      {/* Heading */}
      <SectionHeading
        heading="Testimonial"
        subHeading="BrainZap is transforming the way people learn with AI-powered quizzes! From students to professionals, our users love how it makes learning engaging. See what they have to say!"
      />
      {/* Testimonial Cards */}
      <div className="w-11/12 mx-auto mt-12 lg:p-12 p-6 rounded-xl bg-gradient-to-r from-[#ff93ab] to-[#fdb154] grid lg:grid-cols-3 grid-cols-1 gap-6">
        {testimonialData.map((testimonialData) => (
          <TestimonialCard
            testimonialData={testimonialData}
            key={testimonialData.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
