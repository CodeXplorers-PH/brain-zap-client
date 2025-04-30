import { CalendarClock } from "lucide-react";
import React, { useState } from "react";

const MakeEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Binary Battle [True/False]",
      description:
        "Test your coding instincts with a series of True or False challenges. Quick thinking wins!",
      isActive: true,
    },
  ]);

  const toggleEventStatus = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, isActive: !event.isActive } : event
      )
    );
  };

  return (
    <div className="flex flex-col py-12 px-6 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <CalendarClock size={26} className="border-2 w-14 rounded-full p-2" />
          Manage Events
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
            style={{ background: "rgba(17, 24, 39, 0.85)" }}
          >
            <div
              className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 opacity-20 rounded-full blur-3xl transition-opacity duration-500 hover:opacity-40"
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                <button
                  onClick={() => toggleEventStatus(event.id)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                    event.isActive ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      event.isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-300">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeEvents;