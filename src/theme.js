import { shade, tint, modularScale } from "polished"
import { transparentize } from "@theme-ui/color"

// Creates each four darker and lighter accents from passed hex color
const createAccents = (color, length = 4, steps = 0.32) => {
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
  space: [0, 4, 8, 16, 32, 64, 128],
  colors: {
    ...palette,
    text: palette.gray[0],
    background: palette.white,
    muted: palette.gray[3],
    accent: palette.green[3],
    link: palette.teal[3],
  },
  fonts: {
    body: '"IBM Plex Sans", Georgia, serif',
    heading: '"IBM Plex Sans", MonoLisa, Menlo, monospace',
    monospace: '"IBM Plex Mono", MonoLisa, Menlo, monospace',
  },
  fontSizes: [13, 16, 24, 48],
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
  textStyles: {
    title: {
      m: 0,
      color: "accent",
      fontSize: [2, 3],
      fontWeight: "normal",
      fontFamily: "heading",
      lineHeight: "heading",
    },
    subTitle: {
      m: 0,
      color: "accent",
      fontSize: 2,
      fontWeight: "normal",
      fontFamily: "heading",
      lineHeight: "heading",
    },
    sectionTitle: {
      m: 0,
      color: "text",
      fontSize: 1,
      fontWeight: "bold",
      fontFamily: "heading",
      lineHeight: "body",
    },
    body: {
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
  },
  styles: {
    root: {
      fontFamily: "body",
    },
    a: {
      color: "accent",
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
      mt: 3,
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
    // muted: palette.teal[3],
    accent: palette.orange[3],
  },
}

export default theme
