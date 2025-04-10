import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
