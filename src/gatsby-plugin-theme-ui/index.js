
export default {
    colors: {
        text: '#000',
        background: '#efefef',
        primary: '#07c',
        secondary: '#05a',
        muted: '#f6f6f6',
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'Georgia, serif',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64
    ],
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
        body: 'normal',
        caps: '0.2em',
    },
    layout: {
        narrow: {
            maxWidth: 800
        },
        container: {
            maxWidth: 1024
        }
    },
    styles: {
        root: {
            fontFamily: "body"
        },
        a: {
          color: "primary"
        }
    },
    cards: {
        primary: {
            padding: 2,
            borderRadius: 4,
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
        },
        compact: {
            padding: 1,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'muted',
        },
    },
}
