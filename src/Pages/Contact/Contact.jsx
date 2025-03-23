import { Phone } from "lucide-react";

const Contact = () => {
  return (
    <>
      <section className="bg-[#D0CBFC]">
        {/* Section heading */}
        <div className="pt-40 pb-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-800">
            Contact Us
          </h1>
          <p className="text-gray-300 mt-2 z-10 w-3/4 mx-auto">
            Get in touch with us! Whether you have questions, feedback, or
            collaboration ideas, we're here to help. Reach out and let’s connect
            to create something amazing together!
          </p>
        </div>
        <div className="py-12">
          <div className="lg:w-3/4 w-11/12 mx-auto flex lg:flex-row flex-col justify-between gap-5">
            <div className="p-14 flex flex-col justify-center items-center gap-4 bg-white rounded-xl">
              <Phone />
              <p>+8801739255837</p>
              <p>+880156918531</p>
            </div>

            <div className="p-14 flex flex-col justify-center items-center gap-4 bg-white rounded-xl">
              <Phone />
              <p>+8801739255837</p>
              <p>+880156918531</p>
            </div>

            <div className="p-14 flex flex-col justify-center items-center gap-4 bg-white rounded-xl">
              <Phone />
              <p>+8801739255837</p>
              <p>+880156918531</p>
            </div>
          </div>
          {/* Section form */}
          <div className="p-8 bg-white lg:w-3/4 w-11/12 mx-auto rounded-xl mt-6">
            <h2 className="text-center text-2xl font-bold">Send Us Message</h2>
            <div className="flex justify-between gap-4 mt-4 font-semibold">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Name</label>
                <input
                  className="border p-3 rounded-md focus:outline-none"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col w-full ">
                <label htmlFor="email">Email</label>
                <input
                  className="border p-3 rounded-md focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-4 font-semibold">
              <div className="flex flex-col w-full">
                <label htmlFor="phone">Phone</label>
                <input
                  className="border p-3 rounded-md focus:outline-none"
                  type="text"
                  name="name"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email">Company Name</label>
                <input
                  className="border p-3 rounded-md focus:outline-none"
                  type="text"
                  name="text"
                  placeholder="Enter your company"
                />
              </div>
            </div>
            <div className="flex flex-col w-full font-semibold mt-4">
              <label htmlFor="message">Message</label>
              <textarea
                className="border p-3 rounded-md h-[200px] resize-none focus:outline-none"
                placeholder="Enter message"
                name="message"
              ></textarea>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
