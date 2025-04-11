import React from "react";
import { RotateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RotateLoader size={15} className="text-purple-500" />
    </div>
  );
};

export default Loader;
