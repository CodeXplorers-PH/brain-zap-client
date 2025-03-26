import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eidMubarak from "../../assets/lotties/EidMubarak.json";
import Lottie from "lottie-react";

const EidModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("eidModalSeen");
    if (!hasSeenModal) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("eidModalSeen", "true");
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-xl z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[28rem] bg-white/10 border border-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 text-white flex flex-col items-center"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-center drop-shadow-md uppercase text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-3">
              Eid Mubarak!
            </h2>
            <p className="mt-4 text-lg text-white text-center">
              Wishing you a joyful and blessed Eid!
            </p>
            <Lottie className="w-64 mt-5" animationData={eidMubarak} />
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white 
              px-8 py-3 rounded-full text-lg font-semibold 
              hover:opacity-90 transition-all duration-300 
              shadow-xl shadow-purple-500/30 
              hover:scale-105 active:scale-100"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EidModal;
