import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, Mail, Save, X, CircleCheck, Crown } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';

const ProfileHeader = ({ stats, userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const { user, updateUserProfile } = useAuthContext();

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

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

  // Reset to current user values
  const cancelEditing = () => {
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

  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {photoURL ? (
            <Avatar className="w-24 h-24 md:w-32 md:h-32 text-2xl overflow-hidden border-4 border-purple-600">
              <AvatarImage
                src={photoURL}
                alt={`Photo of ${user?.displayName}`}
              />
              <AvatarFallback>
                {user?.displayName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="bg-purple-600 text-white flex items-center justify-center h-full text-4xl">
              {getInitials()}
            </div>
          )}
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
                {userInfo?.userInfo?.subscription === 'Pro' && (
                  <div className="tooltip" data-tip="Pro Member">
                    <CircleCheck className="text-blue-500 w-6 h-6" />
                  </div>
                )}

                {userInfo?.userInfo?.subscription === 'Elite' && (
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
  );
};

export default ProfileHeader;
