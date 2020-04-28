import { shade, tint } from "polished"

// Creates each four darker and lighter accents from passed hex color
const createAccents = (color, length = 4, steps = 0.25) => {
  const darkAccents = Array.from({ length: length - 1 }, (_, index) =>
    shade(Math.min(steps * (index + 1), 1), color)
  )
  const lightAccents = Array.from({ length }, (_, index) =>
    tint(Math.min(steps * index, 1), color)
  )

  return [...darkAccents.reverse(), ...lightAccents]
}

const palette = {
  pink: createAccents("#e23871"),
  cyan: createAccents("#05a8cd"),
  orange: createAccents("#ff9c00"),
  green: createAccents("#74a308"),
}

export default {
  colors: {
    ...palette,
    text: "#26150e",
    background: "#EDC596",
    primary: "#07c",
    secondary: "#05a",
    muted: "#f6f6f6",
  },
  fonts: {
    body:
      '"IBM Plex Serif", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"IBM Plex Sans", Georgia, serif',
    monospace: '"IBM Plex Mono", MonoLisa, Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
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
  layout: {
    narrow: {
      maxWidth: 800,
    },
    container: {
      p: 4,
      maxWidth: 1024,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
    },
    a: {
      color: "primary",
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
