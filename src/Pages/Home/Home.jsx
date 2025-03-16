import GetStarted from './Sections/GetStarted';
import Faq from './Sections/Faq';
import Features from './Sections/Features';
import Hero from './Sections/Hero';
import Testimonial from './Sections/Testimonial';
import HowItWorks from './Sections/HowItWorks';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <GetStarted />
      <Faq />
      <Testimonial />
      <HowItWorks />
    </>
  );
};

export default Home;
