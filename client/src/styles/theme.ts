import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#2196F3',
    secondary: '#1976D2',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#00BCD4',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#757575',
    lightGray: '#F5F5F5',
    border: '#E0E0E0',
    text: '#212121',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  typography: {
    fontFamily: {
      primary: "'Roboto', sans-serif",
      secondary: "'Open Sans', sans-serif",
    },
    fontSize: {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '24px',
    },
  },
}; 