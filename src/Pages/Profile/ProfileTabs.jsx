import React from "react";

const tabs = [
  { id: "01", title: "Profile", link: "profile" },
  { id: "02", title: "Quiz History", link: "history" },
  { id: "03", title: "Settings", link: "settings" },
  { id: "04", title: "Transaction History", link: "transactionHistory" },
  { id: "05", title: "Achievements", link: "achievements" },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-700 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-3 px-4 font-medium relative ${
            activeTab === tab.link
              ? "text-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab(tab.link)}
        >
          {tab.title}
          {activeTab === tab.link && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
