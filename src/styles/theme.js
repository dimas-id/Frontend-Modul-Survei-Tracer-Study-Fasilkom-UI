import {createMuiTheme} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";

// @todo: use colors guideline

export function themeFactory({type}) {
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
        main: "#00C7E5",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#022047",
        // dark: will be calculated from palette.secondary.main,
      },
      error: {
        main: "#E24C4C",
      },
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      useNextVariants: true,
      fontFamily: [
        "Source Sans Pro",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
}

const theme = themeFactory({});

theme.overrides = {
  MuiAppBar: {
    root: {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  MuiPaper: {
    root: {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    elevation1: {
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  MuiOutlinedInput: {
    root: {
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "#fff",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focused": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
};

export default theme;
