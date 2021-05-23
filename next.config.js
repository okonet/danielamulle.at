module.exports = {
  i18n: {
    locales: ["de-AT"],
    defaultLocale: "de-AT",
  },

  async redirects() {
    return [
      {
        source: "/impressum",
        destination: "/legal/impressum",
        permanent: true,
      },
      {
        source: "/datenschutz",
        destination: "/legal/datenschutz",
        permanent: true,
      },
    ]
  },
}
