import { createContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface themeContextValues {
  theme: Theme;
  zoom: string;
  setZoom: React.Dispatch<React.SetStateAction<string>>;
}
interface ThemeContextProviderProps {
  children: React.ReactNode;
}
const themeContextValues: themeContextValues = {
  theme: 'light',
  zoom: '100%',
  setZoom: () => {},
};

export const ThemeContext =
  createContext<themeContextValues>(themeContextValues);

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [zoom, setZoom] = useState<string>('100%');

  useEffect(() => {
    const themeCss = window.matchMedia('(prefers-color-scheme: light)');
    setTheme(themeCss.matches ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, zoom, setZoom }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
