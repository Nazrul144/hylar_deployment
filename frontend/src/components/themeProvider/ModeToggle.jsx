'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');
    const userAuthenticated = (user && user !== 'null' && user !== 'undefined') || (accessToken && accessToken !== 'null');
    
    setIsLoggedIn(userAuthenticated);
  }, []);

  if (!mounted) {
    return null;
  }

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
        <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
      ) : (
        <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
      )}
    </button>
  );
}

export default ModeToggle;