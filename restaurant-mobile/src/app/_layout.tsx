import { Stack, router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';

import { getToken } from '@/services/auth';

export default function RootLayout() {
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = await getToken();

    if (!token && pathname !== '/') {
      router.replace('/');
    }

    setCheckingAuth(false);
  };

  if (checkingAuth) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
