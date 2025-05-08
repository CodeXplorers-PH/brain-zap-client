import React, { useEffect, useState } from "react";
import "./BrainZapLoader.css";

const BrainZapLoader = ({ loading = true }) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [showBrainZap, setShowBrainZap] = useState(false);

  useEffect(() => {
    // Reset states when loading changes
    const resetLoader = () => {
      setSelectedIndexes([]);
      setShowBrainZap(false);
    };

    if (loading) {
      // Reset loader before starting a new animation cycle
      resetLoader();

      let checkboxTimeout;
      let brainzapTimeout;

      // Function to run the loader cycle
      const runLoaderCycle = () => {
        // Show checkboxes first
        checkboxTimeout = setTimeout(() => {
          const indexes = [];
          while (indexes.length < 3) {
            const randomIndex = Math.floor(Math.random() * 4);
            if (!indexes.includes(randomIndex)) {
              indexes.push(randomIndex);
            }
          }
          setSelectedIndexes(indexes);

          // Show BrainZap text after a short delay
          brainzapTimeout = setTimeout(() => {
            setShowBrainZap(true);

            // Reset for the next cycle
            setTimeout(() => {
              resetLoader();
            }, 3000); // Duration of BrainZap text animation
          }, 1500); // Delay before BrainZap appears
        }, 2500); // Wait for checkboxes to fully appear
      };

      runLoaderCycle();

      // Repeat loader animation as long as loading is true
      const interval = setInterval(() => {
        if (loading) {
          runLoaderCycle();
        } else {
          clearInterval(interval); // Stop repeating when loading becomes false
        }
      }, 7000); // Repeat every 6 seconds (adjust this based on your cycle length)

      // Cleanup on component unmount or when loading stops
      return () => {
        clearTimeout(checkboxTimeout);
        clearTimeout(brainzapTimeout);
        clearInterval(interval);
      };
    }
  }, [loading]); // Dependency on loading to trigger the animation when loading is true

  return (
    <div className="loader-container">
      {/* Checkbox Animation */}
      {!showBrainZap && (
        <div className="checkbox-container">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`checkbox ${
                selectedIndexes.includes(index) ? "selected" : ""
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            ></div>
          ))}
        </div>
      )}

      {/* BrainZap Text Reveal */}
      {showBrainZap && (
        <div className="brainzap-text-wrapper">
          {"BRAINZAP".split("").map((letter, index) => (
            <span
              key={index}
              className="brainzap-letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrainZapLoader;
