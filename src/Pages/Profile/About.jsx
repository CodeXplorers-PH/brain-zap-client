import React from 'react';
import { Calendar, Award, Flame } from 'lucide-react';

const About = ({ userType, stats, streak }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">About</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Calendar size={18} className="text-purple-400 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Member Since</p>
            <p className="text-white">{stats.memberSince}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Flame size={20} className="text-purple-400 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Streak</p>
            <p className="text-white">{streak}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Award size={18} className="text-purple-400 mr-3" />
          <div>
            <p className="text-gray-400 text-sm">Subscription</p>
            <p className="text-white">{userType || 'Free'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
