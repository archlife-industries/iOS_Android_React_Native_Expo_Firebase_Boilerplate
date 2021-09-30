import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00BEC4",
    secondary: "#1C1C1C",
    error: "#941100",
    surface: "#1C1C1C",
    success: "#72fa41"
  }
};

export const avatar_image_theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#24ccff99',
    accent: '#72fa4199',
  },
};