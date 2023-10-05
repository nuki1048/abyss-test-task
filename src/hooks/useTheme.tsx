import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'Before using context, you need to provide a ThemeProvider around your application.'
    );
  }

  return context;
};
