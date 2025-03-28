import GetStarted from './Sections/GetStarted';
import Faq from './Sections/Faq';
import Features from './Sections/Features';
import Hero from './Sections/Hero';
import Testimonial from './Sections/Testimonial';
import HowItWorks from './Sections/HowItWorks';
import CTA from './Sections/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <GetStarted />
      <Faq />
      <Testimonial />
      <HowItWorks />
      <CTA />
    </>
  );
};

export default Home;
