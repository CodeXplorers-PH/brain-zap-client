import React from "react";
import { Helmet } from "react-helmet";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Brain Zap AI | Settings</title>
      </Helmet>
      sd
      <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">
          Account Settings
        </h2>
        <p className="text-gray-400">
          Account settings and preferences would be displayed here.
        </p>
      </div>
    </>
  );
};

export default Settings;
