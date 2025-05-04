import React from 'react';
import { format } from 'date-fns';
import useUserInfo from '@/hooks/useUserInfo';

const TransactionHistory = ({ user }) => {
  const { userInfo } = useUserInfo();

  return (
    <>
      <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
        <h2 className="text-xl font-semibold text-white text-left mb-4">
          Transaction History
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
                    Transaction ID
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
    </>
  );
};

export default TransactionHistory;
