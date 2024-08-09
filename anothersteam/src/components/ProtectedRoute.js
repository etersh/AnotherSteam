// src/components/ProtectedRoute.js

import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '@/state/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/user/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;