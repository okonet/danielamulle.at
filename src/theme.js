import { shade, tint } from "polished"
import { transparentize } from "@theme-ui/color"

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
  gray: createAccents("#7c8591"),
  pink: createAccents("#e23871"),
  cyan: createAccents("#05a8cd"),
  orange: createAccents("#ff8400"),
  beige: createAccents("#ac7b2e"),
  green: createAccents("#74a308"),
  teal: createAccents("#1e5f92"),
  purple: createAccents("#634b99"),
}

const theme = {
  // breakpoints: ["32em", "40em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128],
  colors: {
    text: palette.gray[1],
    background: palette.white,
    primary: palette.cyan[3],
    accent: palette.cyan[2],
    secondary: palette.gray[3],
    muted: palette.gray[5],
    headerBg: palette.cyan[6],
    sectionBg: palette.white,
  },
  fonts: {
    body: '"IBM Plex Mono", Helvetica, Arial, sans-serif',
    heading: '"Yeseva One", "IBM Plex Sans", Helvetica, Arial, sans-serif',
    monospace: '"IBM Plex Mono", monospace',
  },
  fontSizes: ["0.85em", "1em", "1.25em", "1.5em", "2.5em", "3.25em"],
  fontWeights: {
    body: 400,
    heading: 700,
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.75,
    blockquote: 1.5,
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
    thick: "3px solid",
  },
  shadows: {
    none: "none",
    float: "0px 4px 16px rgba(25, 25, 25, 0.075);",
  },
  alerts: {
    error: {
      bg: palette.pink[3],
    },
    success: {
      bg: palette.green[3],
    },
  },
  buttons: {
    primary: {
      fontFamily: "monospace",
      fontSize: 1,
      border: "thin",
      color: "background",
      bg: "primary",
      ":disabled": {
        opacity: 0.5,
      },
    },
    secondary: {
      fontSize: 0,
      color: "primary",
      bg: "transparent",
      border: "thin",
      borderColor: "muted",
      borderRadius: "medium",
      cursor: "pointer",
      transition: "border-color .25s",
      ":hover": {
        color: "text",
        borderColor: "primary",
      },
    },
    print: {
      p: 1,
      bg: "muted",
      color: "background",
      borderRadius: "round",
      cursor: "pointer",
      width: 32,
      height: 32,
    },
  },
  forms: {
    input: {
      fontSize: 1,
      fontFamily: "monospace",
      borderRadius: "medium",
      borderColor: "primary",
      bg: "white",
      "::placeholder": {
        color: "muted",
      },
      ":disabled": {
        opacity: 0.5,
      },
    },
  },
  textStyles: {
    pageTitle: {
      m: 0,
      color: "primary",
      fontSize: 5,
      fontWeight: "normal",
      fontFamily: "heading",
      lineHeight: "heading",
      wordBreak: "break-word", // closes #43
      hyphens: "auto",
      ":first-letter": { textTransform: "uppercase" },
    },
    title: {
      m: 0,
      color: "primary",
      fontSize: 4,
      fontWeight: "normal",
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
      fontFamily: "body",
      lineHeight: "body",
    },
    cardTitle: {
      m: 0,
      color: "background",
      fontSize: 1,
      fontWeight: "bold",
      fontFamily: "body",
      lineHeight: "body",
    },
    cardMeta: {
      m: 0,
      color: "background",
      fontSize: 0,
      fontFamily: "body",
      fontWeight: "normal",
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
    disclaimer: {
      color: "secondary",
      fontSize: 0,
      fontFamily: "body",
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
    containerWide: {
      px: [3, 4, 72],
      maxWidth: 984, // 12 x (70px + 16px gap)
    },
    section: {
      flexGrow: 1,
      maxWidth: 984, // 12 x (70px + 16px gap)
      py: [3, 4],
      px: [3, 4, 5],
      bg: "sectionBg",
      borderRadius: ["none", "none", "medium"],
      zIndex: 1,
    },
  },
  styles: {
    root: {
      fontSize: 1,
      fontFamily: "body",
      fontWeight: "normal",
      lineHeight: "body",
      "@media print": {
        fontSize: "10pt",
      },
    },
    a: {
      color: "primary",
      textDecoration: "none",
      borderBottom: "thin",
      borderBottomColor: transparentize("primary", 0.75),
      ":hover": {
        borderBottomColor: transparentize("primary", 0.25),
      },
      ".active": {
        color: "accent",
      },
    },
    h1: {
      variant: "textStyles.title",
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
        color: "muted",
        content: '" ✼ "',
      },
    },
    ol: {
      p: 0,
      pl: 4,
      my: 2,
    },
    li: {
      mb: 3,
      variant: "textStyles.body",
    },
    table: {
      display: ["block", "block", "table"],
      borderCollapse: "collapse",
      width: "100%",
      overflow: "auto",
    },
    th: {
      p: 2,
      textAlign: "center",
    },
    tr: {
      "& + &": {
        borderTop: "thin",
        borderColor: "muted",
      },
    },
    td: {
      px: 2,
      py: 1,
      ":not(:first-of-type)": {
        textAlign: "center",
      },
    },
    blockquote: {
      p: 0,
      ml: 4,
      my: 4,
      "> p": {
        m: 0,
        fontSize: 2,
        fontFamily: "body",
        fontStyle: "italic",
        lineHeight: "blockquote",
      },
    },
  },
}

export const homeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.gray[6],
    sectionBg: palette.gray[6],
    headerBg: palette.gray[6],
  },
  // coverSrc: unsplashURL("HMSRWdQn5jM"),
}

export const aboutTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.pink[1],
    background: palette.pink[6],
    headerBg: palette.pink[5],
    sectionBg: palette.pink[6],
    accent: palette.pink[2],
    primary: palette.pink[3],
    secondary: palette.pink[4],
    muted: palette.pink[5],
  },
  coverSrc: unsplashURL("W6cPNv8daRA"),
}

export const offersTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.green[1],
    background: palette.green[6],
    headerBg: palette.green[5],
    sectionBg: palette.green[6],
    accent: palette.green[2],
    primary: palette.green[3],
    secondary: palette.green[4],
    muted: palette.green[5],
  },
  coverSrc: unsplashURL("sTPy-oeA3h0"),
  // coverSrc: unsplashURL("kcRFW-Hje8Y"),
  // coverSrc: unsplashURL("AWMWcR3hQUg"),
}

export const testimonialsTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.beige[1],
    background: palette.beige[6],
    accent: palette.teal[2],
    primary: palette.teal[3],
    secondary: palette.teal[4],
    muted: palette.teal[5],
  },
  coverSrc: unsplashURL("j_YWoV_uzRw"),
}

export const projectsTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.cyan[1],
    background: palette.cyan[6],
    headerBg: palette.cyan[5],
    sectionBg: palette.cyan[6],
    accent: palette.cyan[2],
    primary: palette.cyan[3],
    secondary: palette.cyan[4],
    muted: palette.cyan[5],
  },
  coverSrc: unsplashURL("0e7zpLLKSzA"),
}

export const recipesTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.teal[1],
    background: palette.beige[6],
    primary: palette.orange[3],
    accent: palette.teal[2],
    secondary: palette.teal[3],
    muted: palette.teal[5],
    sectionBg: palette.beige[6],
    headerBg: palette.orange[5],
  },
  coverSrc: unsplashURL("pAnjPqQP0UQ"),
}

export const blogTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.black,
    background: palette.teal[6],
    accent: palette.cyan[2],
    primary: palette.cyan[2],
    sectionBg: palette.teal[6],
    headerBg: palette.teal[5],
  },
  coverSrc: unsplashURL("j_YWoV_uzRw"),
}

export const footerTheme = {
  ...theme,
  colors: {
    text: palette.gray[3],
    primary: palette.gray[3],
    accent: palette.gray[1],
    secondary: palette.gray[3],
    muted: palette.gray[5],
  },
}

export default theme
