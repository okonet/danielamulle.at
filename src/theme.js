import { shade, tint } from "polished"

// Creates each four darker and lighter accents from passed hex color
const createAccents = (color, length = 4, steps = 0.3) => {
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
  gray: createAccents("#ccc", 4, 0.42),
  pink: createAccents("#e23871"),
  cyan: createAccents("#05a8cd"),
  orange: createAccents("#ff9c00"),
  green: createAccents("#74a308"),
  teal: createAccents("#1e5f92"),
}

const theme = {
  colors: {
    ...palette,
    text: palette.gray[1],
    background: palette.gray[6],
    muted: palette.gray[4],
    accent: palette.green[3],
  },
  fonts: {
    body:
      '"IBM Plex Serif", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"IBM Plex Sans", Georgia, serif',
    monospace: '"IBM Plex Mono", MonoLisa, Menlo, monospace',
  },
  fontSizes: [13, 16, 24, 48],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  radii: {
    small: 2,
    medium: 5,
    round: 99999,
  },
  shadows: {
    none: "none",
    float: "0px 4px 16px rgba(25, 25, 25, 0.075);",
  },
  layout: {
    full: {
      maxWidth: 1024,
    },
    container: {
      maxWidth: 880,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
    },
    a: {
      color: "accent",
    },
    h1: {
      m: 0,
      mb: 4,
      color: "accent",
      fontSize: [2, 3],
      fontFamily: "body",
    },
    h2: {
      m: 0,
      my: 2,
      color: "text",
      fontSize: 1,
      fontWeight: "bold",
      fontFamily: "heading",
    },
    ul: {
      my: 2,
      pl: 0,
    },
    ol: {
      p: 0,
      pl: 3,
      mt: 3,
    },
    li: {
      mb: 3,
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      bg: "white",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
}

export const aboutTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.pink[1],
    background: palette.pink[6],
    muted: palette.pink[4],
    accent: palette.pink[3],
  },
  coverSrc: unsplashURL("9aOswReDKPo"),
}

export const whatTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.cyan[1],
    background: palette.cyan[6],
    muted: palette.cyan[4],
    accent: palette.cyan[3],
  },
  coverSrc: unsplashURL("08bOYnH_r_E"),
}

export const howTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.green[1],
    background: palette.green[6],
    muted: palette.green[4],
    accent: palette.green[3],
  },
  coverSrc: unsplashURL("sTPy-oeA3h0"),
}

export const recipesTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: palette.teal[1],
    background: palette.teal[6],
    muted: palette.teal[4],
    accent: palette.orange[3],
  },
}

export default theme
