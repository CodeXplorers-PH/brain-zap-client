import Button from "@/components/ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <>
      <section className="bg-[#090909]">
        {/* Section heading */}
        <div className="pt-40 pb-8 text-center">
          <h1 className="text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>

          <p className="text-gray-300 mt-2 z-10 w-[70%] mx-auto">
            Get in touch with us! Whether you have questions, feedback, or
            collaboration ideas, we're here to help. Reach out and let’s connect
            to create something amazing together!
          </p>
        </div>
        <div className="py-12">
          {/* Section contact info */}
          <div className="lg:w-3/4 w-11/12 mx-auto flex lg:flex-row flex-col justify-between gap-5">
            <div className="p-10 flex flex-col justify-center items-center gap-4 bg-white/10 backdrop-blur-lg text-white rounded-2xl lg:w-1/3 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.2)] border border-white/20">
              {/* Phone Icon with Animation */}
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg animate-bounce">
                <Phone className="text-white text-3xl" />
              </div>

              {/* Phone Numbers */}
              <p className="text-lg font-semibold tracking-wide hover:text-pink-400 transition duration-300">
                +8801739255837
              </p>
              <p className="text-lg font-semibold tracking-wide hover:text-purple-400 transition duration-300">
                +880156918531
              </p>
            </div>

            <div className="p-10 flex flex-col justify-center items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl lg:w-1/3 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.3)]">
              {/* Mail Icon with a Gradient Background */}
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg animate-bounce">
                <Mail className="text-white text-3xl" />
              </div>

              {/* Email Addresses */}
              <p className="text-lg font-medium tracking-wide transition duration-300 hover:text-blue-400 cursor-pointer">
                code@xplorers.com
              </p>
              <p className="text-lg font-medium tracking-wide transition duration-300 hover:text-teal-400 cursor-pointer">
                zamanahbab007@gmail.com
              </p>
            </div>

            <div className="p-10 flex flex-col justify-center items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl lg:w-1/3 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.3)]">
              {/* Map Pin Icon with Gradient Background */}
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg animate-bounce">
                <MapPin className="text-white text-3xl" />
              </div>

              {/* Location Text */}
              <p className="text-lg font-medium tracking-wide transition duration-300 hover:text-orange-400 cursor-pointer">
                Mirpur, Dhaka
              </p>
            </div>
          </div>

          {/* Section form */}
          <div className="p-10 bg-white/10 backdrop-blur-lg border border-white/20 text-white lg:w-3/4 w-11/12 mx-auto rounded-2xl mt-6 shadow-lg">
            {/* Heading */}
            <h2 className="text-center text-3xl font-bold text-white">
              Send Us a Message
            </h2>

            {/* Name & Email */}
            <div className="flex lg:flex-row flex-col justify-between gap-6 mt-6 font-medium">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-2 text-lg">
                  Name
                </label>
                <input
                  className="border border-white/30 bg-white/10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-2 text-lg">
                  Email
                </label>
                <input
                  className="border border-white/30 bg-white/10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone & Company Name */}
            <div className="flex lg:flex-row flex-col justify-between gap-6 mt-6 font-medium">
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="mb-2 text-lg">
                  Phone
                </label>
                <input
                  className="border border-white/30 bg-white/10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="company" className="mb-2 text-lg">
                  Company Name
                </label>
                <input
                  className="border border-white/30 bg-white/10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="company"
                  placeholder="Enter your company"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col w-full font-medium mt-6">
              <label htmlFor="message" className="mb-2 text-lg">
                Message
              </label>
              <textarea
                className="border border-white/30 bg-white/10 p-4 rounded-lg h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your message"
                name="message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
