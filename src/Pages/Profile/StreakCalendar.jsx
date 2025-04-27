import React from 'react';
import { Flame } from 'lucide-react';

const StreakCalendar = ({ userQuizHistory }) => {
    // Utility to get date in local YYYY-MM-DD format
    const formatDateLocal = date => {
        return date.toLocaleDateString('en-CA'); // gives 'YYYY-MM-DD' format
    };

    // Get the last 7 days
    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            days.push(date);
        }
        return days;
    };

    // Extract unique quiz dates
    const quizDaysSet = new Set(
        userQuizHistory.map(q => formatDateLocal(new Date(q.date)))
    );

    // Get the last 7 days for the calendar
    const last7Days = getLast7Days();

    return (
        <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Streak Calendar</h2>
            <div className="flex justify-between">
                {last7Days.map((day, index) => {
                    const dayStr = formatDateLocal(day);
                    const hasQuiz = quizDaysSet.has(dayStr);
                    return (
                        <div key={index} className="flex flex-col items-center">
                            <p className="text-gray-400 text-xs mb-1">
                                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </p>
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${hasQuiz
                                        ? 'bg-orange-500/20 text-orange-400'
                                        : 'bg-gray-700/50 text-gray-400'
                                    }`}
                            >
                                {hasQuiz ? (
                                    <Flame size={16} />
                                ) : (
                                    <span className="text-sm">{day.getDate()}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StreakCalendar;