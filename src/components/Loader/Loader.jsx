import React from "react";
import BrainZapLoader from "../BrainZapLoader/BrainZapLoader";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {/* <RotateLoader size={15} color="#6f42c1"/> */}
      <BrainZapLoader />
    </div>
  );
};

export default Loader;
