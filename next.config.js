module.exports = {
  i18n: {
    locales: ["de-AT"],
    defaultLocale: "de-AT",
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|webp|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ]
  },
}
