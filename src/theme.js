export default {
  colors: {
    text: "#26150e",
    background: "#EDC596",
    primary: "#07c",
    secondary: "#05a",
    muted: "#f6f6f6",
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "Pacifico, Georgia, serif",
    monospace: "MonoLisa, Menlo, monospace",
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
