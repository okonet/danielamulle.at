import { shade, tint } from "polished"

// Creates each four darker and lighter accents from passed hex color
const createAccents = (color, length = 4, steps = 0.31) => {
  const darkAccents = Array.from({ length: length - 1 }, (_, index) =>
    shade(Math.min(steps * (index + 1), 1), color)
  )
  const lightAccents = Array.from({ length }, (_, index) =>
    tint(Math.min(steps * index, 1), color)
  )

  return [...darkAccents.reverse(), ...lightAccents]
}

function unsplashURL(imageId) {
  return `//source.unsplash.com/${imageId}/2560x1920`
}

export const palette = {
  white: "#fff",
  black: "#000",
  gray: createAccents("#92969b"),
  pink: createAccents("#e23871"),
  cyan: createAccents("#05a8cd"),
  orange: createAccents("#ff8400"),
  green: createAccents("#74a308"),
  teal: createAccents("#1e5f92"),
}

const theme = {
  breakpoints: ["32em", "40em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128],
  colors: {
    text: palette.gray[1],
    background: palette.white,
    primary: palette.cyan[3],
    secondary: palette.gray[3],
    accent: palette.cyan[2],
    muted: palette.gray[5],
  },
  fonts: {
    body: '"IBM Plex Sans", Helvetica, Arial, sans-serif',
    heading: '"IBM Plex Sans", Helvetica, Arial, sans-serif',
    monospace: '"IBM Plex Mono", monospace',
  },
  fontSizes: ["0.85em", "1em", "1.25em", "3em"],
  fontWeights: {
    body: 400,
    heading: 700,
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    condensed: -0.5,
    caps: "0.2em",
  },
  radii: {
    none: 0,
    small: 2,
    medium: 5,
    round: 99999,
  },
  borders: {
    thin: "1px solid",
  },
  shadows: {
    none: "none",
    float: "0px 4px 16px rgba(25, 25, 25, 0.075);",
  },
  buttons: {
    primary: {
      bg: "secondary",
    },
    secondary: {
      fontSize: 0,
      color: "secondary",
      bg: "transparent",
      border: "thin",
      borderColor: "muted",
      borderRadius: "medium",
      cursor: "pointer",
      transition: "border-color .25s",
      ":hover": {
        color: "text",
        borderColor: "secondary",
      },
    },
    print: {
      p: 1,
      bg: "transparent",
      borderRadius: "round",
      cursor: "pointer",
    },
  },
  textStyles: {
    pageTitle: {
      color: "primary",
    },
    title: {
      m: 0,
      color: "primary",
      fontSize: 3,
      fontWeight: "body",
      fontFamily: "heading",
      lineHeight: "heading",
      wordBreak: "break-word", // closes #43
    },
    subTitle: {
      m: 0,
      color: "primary",
      fontSize: 2,
      fontWeight: "normal",
      fontFamily: "heading",
      lineHeight: "heading",
    },
    sectionTitle: {
      m: 0,
      color: "secondary",
      fontSize: 0,
      fontWeight: "bold",
      fontFamily: "heading",
      lineHeight: "body",
    },
    lead: {
      color: "text",
      fontSize: [1, 2, 2],
      fontFamily: "body",
      fontWeight: "normal",
      lineHeight: "body",
    },
    body: {
      color: "text",
      fontSize: 1,
      fontFamily: "body",
      fontWeight: "normal",
      lineHeight: "body",
    },
  },
  layout: {
    full: {
      px: 3,
      maxWidth: 1016, // 12 x (70px + 16px gap)
    },
    container: {
      px: [3, 3, 0],
      maxWidth: 844, // 10 x (70px + 16px gap)
    },
    section: {
      maxWidth: 984, // 12 x (70px + 16px gap)
      py: [3, 4],
      px: [3, 3, 72],
      mt: [0, -4],
      bg: "white",
      borderRadius: ["none", "none", "medium"],
      zIndex: 1,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      "@media print": {
        fontSize: "10pt",
      },
    },
    a: {
      color: "secondary",
      ":hover": {
        textDecoration: "underline",
      },
      ".active": {
        color: "accent",
      },
    },
    h1: {
      variant: "textStyles.title",
      mt: 4,
    },
    h2: {
      variant: "textStyles.subTitle",
      mt: 4,
    },
    h3: {
      variant: "textStyles.sectionTitle",
      mt: 4,
    },
    p: {
      my: 3,
      variant: "textStyles.body",
    },
    ul: {
      position: "relative",
      my: 2,
      pl: 3,
      listStyle: "none",
      "li::before": {
        position: "absolute",
        left: 0,
        fontSize: "11px",
        lineHeight: 2.2,
        // variant: "textStyles.sectionTitle",
        color: "muted",
        content: '" ✼ "',
      },
    },
    ol: {
      p: 0,
      pl: 3,
      my: 2,
    },
    li: {
      mb: 3,
      variant: "textStyles.body",
    },
  },
}

export const homeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.gray[1],
    background: palette.gray[6],
    primary: palette.cyan[3],
  },
  coverSrc: unsplashURL("HlNcigvUi4Q"),
}

export const aboutTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.pink[1],
    background: palette.pink[6],
    accent: palette.pink[2],
    primary: palette.pink[3],
    secondary: palette.pink[4],
    muted: palette.pink[5],
  },
  coverSrc: unsplashURL("9aOswReDKPo"),
}

export const whatTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.cyan[1],
    background: palette.cyan[6],
    accent: palette.cyan[2],
    primary: palette.cyan[3],
    secondary: palette.cyan[4],
    muted: palette.cyan[5],
  },
  textStyles: {
    ...theme.textStyles,
    pageTitle: {
      color: "background",
    },
  },
  // coverSrc: unsplashURL("08bOYnH_r_E"),
  coverSrc: unsplashURL("QSHF4Q1S0JU"),
}

export const howTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.green[1],
    background: palette.green[6],
    accent: palette.green[2],
    primary: palette.green[3],
    secondary: palette.green[4],
    muted: palette.green[5],
  },
  textStyles: {
    ...theme.textStyles,
    pageTitle: {
      color: "background",
    },
  },
  coverSrc: unsplashURL("sTPy-oeA3h0"),
}

export const recipesTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.teal[1],
    background: palette.teal[6],
    primary: palette.orange[3],
    secondary: palette.teal[3],
    accent: palette.orange[2],
    muted: palette.teal[5],
  },
  coverSrc: unsplashURL("0JFveX0c778"),
}

export const blogTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.black,
    background: palette.gray[6],
    primary: palette.gray[1],
    secondary: palette.gray[3],
    accent: palette.gray[2],
    muted: palette.gray[5],
  },
  coverSrc: unsplashURL("xG8IQMqMITM"),
}

export default theme
