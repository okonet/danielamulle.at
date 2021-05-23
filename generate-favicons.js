const fs = require("fs")
const path = require("path")
const favicons = require("favicons")

const rootPath = path.join(__dirname)
const iconPath = path.join(rootPath, "public", "images", "logo@2x.png")
const faviconPath = path.join(rootPath, "public", "icons")

favicons(
  iconPath,
  {
    path: "/public/icons/",
    pipeHTML: false,
    replace: true,
  },
  (err, { images }) => {
    if (err) {
      return console.error(err)
    }

    const requiredFavicons = [
      "apple-touch-icon-180x180.png",
      "favicon-32x32.png",
      "favicon.ico",
    ]

    images.forEach(({ name, contents }) => {
      const filePath = path.join(faviconPath, name)

      if (requiredFavicons.includes(name)) {
        fs.writeFile(filePath, contents, (err) => {
          if (err) {
            return console.error(err)
          }
          console.log(`Wrote ${filePath}`)
        })
      }
    })
  }
)
