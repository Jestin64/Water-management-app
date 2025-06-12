import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      warning: string;
      info: string;
      white: string;
      black: string;
      gray: string;
      lightGray: string;
      border: string;
      text: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
      };
      fontSize: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
      };
    };
  }
} 