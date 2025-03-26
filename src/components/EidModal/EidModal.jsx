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
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-gray-300 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-2xl font-bold uppercase text-center">
              Eid Mubarak!
            </h2>
            <p className="mt-2 text-gray-400 text-center">
              Wishing you a joyful and blessed Eid.
            </p>
            <Lottie className="w-40 mt-4" animationData={eidMubarak} />
            <motion.button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
