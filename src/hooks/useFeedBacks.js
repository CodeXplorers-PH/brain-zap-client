import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useFeedbacks = () => {
  const axiosSecure = useAxiosSecure();

  const fetchFeedbacks = async () => {
    const { data } = await axiosSecure.post(`/adminDashboard`, {
      query: `
            query {
              feedback {
                _id
                name
                email
                message
                feedbackType
                date
                read
              }
            }
          `,
    });

    const feedbacks = data?.data?.feedback;

    return feedbacks || [];
  };

  const {
    data: feedbacks = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: fetchFeedbacks,
  });

  return { feedbacks, loading, refetch };
};

export default useFeedbacks;
