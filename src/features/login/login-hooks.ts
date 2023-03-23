import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useOnLogin = (callback: () => void) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.accessToken != null) {
      callback();
    }
  }, [session, callback]);
};
