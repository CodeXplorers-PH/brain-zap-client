import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAdminHome = async () => {
    const { data } = await axiosSecure.post(`/adminDashboard`, {
      query: `
            query {
              adminDashboard {
                totalUsers
                totalFeedback
                totalFreeUsers
                totalProUsers
                totalEliteUsers
                totalRevenue
                latestFeedback {
                  _id
                  name
                  email
                  message
                  feedbackType
                  date
                }
              }
            }
          `,
    });

    const dashboardData = data?.data?.adminDashboard;

    return dashboardData || {};
  };

  const { data: dashboardData = {}, isLoading: loading } = useQuery({
    queryKey: ['dashboardHome'],
    queryFn: fetchAdminHome,
  });

  return { dashboardData, loading };
};

export default useAdminHome;
