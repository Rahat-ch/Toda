import { useState, useEffect } from 'react';
import { getMe } from '../apiRequests/auth';

function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    async function getUser() {
      const result = await getMe()
      console.log(result);
      if (result.success) setUser(result.data);
      if (!result.success) setError(result.error);
    }
    getUser()
  }, [])
  return [user, error];
}

export default useAuth;