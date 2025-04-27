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

  console.log(events);

  return (
    <div className="flex flex-col mb-6 py-20 px-6">
      <div className="mb-10 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <CalendarClock size={26} className="border-2 w-14 rounded-full" />
          Manage Events
        </h2>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative rounded-2xl border border-gray-800 p-6 bg-gradient-to-br from-gray-900 to-gray-800 transition hover:scale-[1.02] duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{event.name}</h3>
              {/* Switch */}
              <button
                onClick={() => toggleEventStatus(event.id)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  event.isActive ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    event.isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeEvents;
