import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import {
  Edit2,
  Mail,
  Calendar,
  Award,
  Clock,
  FileText,
  Save,
  X,
  CircleCheck,
  Crown,
  Zap,
  Flame,
} from 'lucide-react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [userInfo, setUserInfo] = useState(null);
  const [userQuizHistory, setUserQuizHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const xpPoints = userQuizHistory.reduce((prev, curr) => prev + curr.score, 0);
  const totalScore = userQuizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
  const avgScore = totalScore / userQuizHistory.length;

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const navigate = useNavigate();

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  useEffect(() => {
    axiosPublic
      .get(`/quiz_history/${user?.email}`)
      .then(res => {
        setUserQuizHistory(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic, user]);

  useEffect(() => {
    if (!user?.email) return; // Prevent running if email is not loaded yet

    const fetchUserInfo = async () => {
      try {
        const res = await axiosPublic.get(`/userInfo/${user.email}`);
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUserInfo();
  }, [axiosPublic, user]);

  // Streaks Code Starts Here
  useEffect(() => {
    if (!user) return;

    axiosPublic
      .get(`/quiz_history/${user?.email}`)
      .then(res => {
        const history = res?.data || [];
        setUserQuizHistory(history);
        console.log(history);

        // Utility to get date in local YYYY-MM-DD format
        const formatDateLocal = dateStr => {
          const date = new Date(dateStr);
          return date.toLocaleDateString('en-CA'); // gives 'YYYY-MM-DD' format
        };

        // Extract unique quiz dates (formatted locally)
        const quizDaysSet = new Set(history.map(q => formatDateLocal(q.date)));

        const today = new Date();
        const todayStr = today.toLocaleDateString('en-CA');

        // 🛑 If user didn't give quiz today, streak = 0
        if (!quizDaysSet.has(todayStr)) {
          setStreak(0);
          return;
        }

        // ✅ Start with today counted
        let streakCount = 1;

        // 🔁 Check previous consecutive days
        for (let i = 1; ; i++) {
          const prevDate = new Date();
          prevDate.setDate(today.getDate() - i);
          const prevStr = prevDate.toLocaleDateString('en-CA');

          if (quizDaysSet.has(prevStr)) {
            streakCount++;
          } else {
            break;
          }
        }

        setStreak(streakCount);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic, user]);

  // Streaks Code Ends Here

  // Sample stats - replace with actual data from your application
  const stats = {
    quizzesTaken: userQuizHistory?.length,
    totalPoints: xpPoints,
    avgScore: avgScore > 0 ? avgScore.toFixed(2) : 0,
    memberSince: user?.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : new Date().toLocaleDateString(),
    lastActive: 'Now',
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Create a new profile update object
      const profileUpdates = {
        displayName: displayName.trim() || user.displayName || '',
        photoURL: photoURL.trim() || user.photoURL || '',
      };

      // Update the profile
      await updateUserProfile(profileUpdates);

      // Reset state
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    // Reset to current user values
    setDisplayName(user?.displayName || '');
    setPhotoURL(user?.photoURL || '');
    setIsEditing(false);
  };

  const getInitials = () => {
    if (displayName && displayName.trim()) {
      return displayName.trim().charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Handle View Quiz History
  const handleViewHistory = quiz => {
    const { category, answers, questions } = quiz;

    if (answers && questions) {
      localStorage.setItem('quiz_questions', JSON.stringify(questions));
      localStorage.setItem('userAnswers', JSON.stringify(answers));
      localStorage.setItem('history_posted', true);

      navigate(`/quiz/${category}/answer`);
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="bg-purple-600 text-white flex items-center justify-center h-full text-4xl">
                    {getInitials()}
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-all duration-200"
              >
                <Edit2 size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              {isEditing ? (
                <div className="mb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="displayName"
                      className="text-sm font-medium text-gray-300 block mb-1"
                    >
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      placeholder="Display Name"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="photoURL"
                      className="text-sm font-medium text-gray-300 block mb-1"
                    >
                      Photo URL
                    </label>
                    <input
                      type="text"
                      id="photoURL"
                      value={photoURL}
                      onChange={e => setPhotoURL(e.target.value)}
                      placeholder="https://i.ibb.co.com/..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-center md:justify-start text-gray-400 mt-2">
                    <Mail size={16} className="mr-2" />
                    <span>{user?.email || 'user@example.com'}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={loading}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                    {user?.displayName || 'BrainZapper'}

                    {/* Premium Members Tick */}
                    {userInfo?.subscription === 'Pro' && (
                      <div className="tooltip" data-tip="Pro Member">
                        <CircleCheck className="text-blue-500 w-6 h-6" />
                      </div>
                    )}

                    {userInfo?.subscription === 'Elite' && (
                      <div className="tooltip" data-tip="Elite Member">
                        <Crown className="text-amber-500 w-6 h-6" />
                      </div>
                    )}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start text-gray-400 mb-4">
                    <Mail size={16} className="mr-2" />
                    <span>{user?.email || 'user@example.com'}</span>
                  </div>
                </>
              )}

              {/* Stats Summary - Only show when not editing */}
              {!isEditing && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Quizzes Taken</p>
                    <p className="text-white font-bold text-xl">
                      {stats.quizzesTaken}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Total Points</p>
                    <p className="text-white font-bold text-xl">
                      {stats.totalPoints}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 col-span-2 md:col-span-1">
                    <p className="text-gray-400 text-sm">Average Score</p>
                    <p className="text-white font-bold text-xl">
                      {stats.avgScore}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`py-3 px-4 font-medium relative ${
              activeTab === 'profile'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
            )}
          </button>
          <button
            className={`py-3 px-4 font-medium relative ${
              activeTab === 'history'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Quiz History
            {activeTab === 'history' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
            )}
          </button>
          <button
            className={`py-3 px-4 font-medium relative ${
              activeTab === 'settings'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
            {activeTab === 'settings' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
            )}
          </button>
          <button
            className={`py-3 px-4 font-medium relative ${
              activeTab === 'transecHistory'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('transecHistory')}
          >
            Transection History
            {activeTab === 'transecHistory' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
            )}
          </button>
        </div>

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
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
                    <p className="text-white">
                      {userInfo?.subscription || 'Free'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Section */}
            <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Achievements
              </h2>
              <div className="space-y-4">
                <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
                  <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                    <Award size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Quiz Master</p>
                    <p className="text-gray-400 text-sm">
                      Completed 25+ quizzes
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
                  <div className="bg-gray-600/20 p-2 rounded-lg mr-3">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Perfect Score</p>
                    <p className="text-gray-400 text-sm">
                      Get 100% on any quiz (0/1)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Performance */}
            <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Performance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Quiz
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Date
                      </th>
                      <th className="text-right py-3 text-gray-400 font-medium">
                        Score
                      </th>
                    </tr>
                  </thead>
                  {userQuizHistory?.slice(0, 5)?.map((quiz, index) => (
                    <tbody key={index}>
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 text-white">
                          {quiz?.category?.charAt(0).toUpperCase() +
                            quiz?.category?.slice(1)}
                        </td>
                        <td className="py-3 text-gray-400">
                          {format(new Date(quiz?.date), 'EEEE, MMMM dd, yyyy')}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`${
                              quiz.score >= 80
                                ? 'bg-green-500/20 text-green-400'
                                : quiz.score >= 50
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            } py-1 px-2 rounded-md`}
                          >
                            {quiz.score}%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  View All History →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === 'history' && (
          <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
            <h2 className="text-xl font-semibold text-white text-left mb-4">
              Quiz History
            </h2>
            {user && userQuizHistory?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      {['Quiz', 'Date', 'Score', 'Action'].map(
                        (tHead, index) => (
                          <th
                            key={index}
                            className={`py-3 text-gray-400 font-medium ${
                              index > 1 ? 'text-right' : 'text-left'
                            }`}
                          >
                            {tHead}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {userQuizHistory.map((quiz, index) => (
                      <tr key={index} className="border-b border-gray-700/50">
                        <td className="py-3 text-white text-left">
                          {quiz?.category?.charAt(0).toUpperCase() +
                            quiz?.category?.slice(1)}
                        </td>
                        <td className="py-3 text-gray-400 text-left">
                          {format(new Date(quiz?.date), 'EEEE, MMMM dd, yyyy')}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`${
                              quiz.score >= 80
                                ? 'bg-green-500/20 text-green-400'
                                : quiz.score >= 50
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            } py-1 px-2 rounded-md`}
                          >
                            {quiz.score}%
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleViewHistory(quiz)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-purple-300 transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Quiz History
                </h2>
                <p className="text-gray-400">
                  Complete quiz history would be displayed here.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-2">
              Account Settings
            </h2>
            <p className="text-gray-400">
              Account settings and preferences would be displayed here.
            </p>
          </div>
        )}

        {/* Transection history */}
        {activeTab === 'transecHistory' && (
          <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
            <h2 className="text-xl font-semibold text-white text-left mb-4">
              Transection History
            </h2>
            {user && userInfo?.transectionId?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Type
                      </th>
                      <th className="text-left py-3 text-gray-400 font-medium">
                        Transection ID
                      </th>
                      <th className="text-right py-3 text-gray-400 font-medium">
                        Valid Till
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-3 text-white text-left">
                        {userInfo?.subscription}
                      </td>
                      <td className="py-3 text-white text-left">
                        {userInfo?.transectionId}
                      </td>
                      <td className="py-3 text-right text-white">
                        {format(
                          new Date(userInfo?.subscriptionLastTime),
                          'MMMM dd, yyyy'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Transaction History
                </h2>
                <p className="text-gray-400">
                  Your Transaction History would be displayed here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
