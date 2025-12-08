'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');
    const userAuthenticated = (user && user !== 'null' && user !== 'undefined') || (accessToken && accessToken !== 'null');
    
    if (!userAuthenticated) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
}