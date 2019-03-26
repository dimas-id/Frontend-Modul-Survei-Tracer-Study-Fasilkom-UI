import { createMuiTheme } from "@material-ui/core/styles";

// @todo: use colors guideline

export function themeFactory({ type }) {
  const currentType = type || "light";
  return createMuiTheme({
    palette: {
      /**
       * override to change colors
       * color palette always has these keys
       *     light
       *     main,
       *     dark,
       *     contrastText,
       */
      type: currentType,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#2D4EF5",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#4CE2A7",
        // dark: will be calculated from palette.secondary.main,
      },
      error: {
        main: "#E24C4C"
      }
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(",")
    }
  });
}

export default themeFactory({});
