'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in - adjust this based on your auth logic
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Use whichever method matches your authentication
    const userAuthenticated = isLoggedIn || (user && user !== 'null' && user !== 'undefined') || (token && token !== 'null');
    
    if (!userAuthenticated) {
      // Force light theme for non-logged-in users
      localStorage.setItem('theme', 'light');
    }
  }, []);

  // Prevent flash by not rendering until mounted
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