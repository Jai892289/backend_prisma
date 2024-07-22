import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
 
  const renderThemeChnager = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

      if (currentTheme === 'dark') {
      return (
        <MoonIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('dark')}
        />
      );
    }
  };

  return <div>{renderThemeChnager()}</div>;
};

export default ThemeToggle;
