'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in - adjust this based on your auth logic
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
    
    // Use whichever method matches your authentication
    const userAuthenticated = isLoggedInStorage || (user && user !== 'null' && user !== 'undefined') || (token && token !== 'null');
    
    setIsLoggedIn(userAuthenticated);
  }, []);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Don't render toggle if not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}