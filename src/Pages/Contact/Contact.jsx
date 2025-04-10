import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Whether you have questions, feedback, or collaboration ideas, we're
            here to help. Reach out and let's create something amazing together!
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-8 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Phone className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
              <div className="space-y-2">
                <a
                  href="tel:+8801739255837"
                  className="block text-gray-400 hover:text-purple-400 transition-colors"
                >
                  +880 1739 255837
                </a>
                <a
                  href="tel:+8801569185310"
                  className="block text-gray-400 hover:text-purple-400 transition-colors"
                >
                  +880 1569 185310
                </a>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Mail className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
              <div className="space-y-2">
                <a
                  href="mailto:team.codexplorers@gmail.com"
                  className="block text-gray-400 hover:text-blue-400 transition-colors"
                >
                  team.codexplorers@gmail.com
                </a>
                <a
                  href="mailto:zamanahbab007@gmail.com"
                  className="block text-gray-400 hover:text-blue-400 transition-colors"
                >
                  zamanahbab007@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-8 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
              <p className="text-gray-400 hover:text-emerald-400 transition-colors">
                Mirpur, Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} className="rounded-xl bg-gray-800/50 border border-gray-700 p-8 md:p-10 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="+880 1234 567890"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-gray-300 mb-2 font-medium"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
