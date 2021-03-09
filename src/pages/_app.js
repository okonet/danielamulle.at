/* @jsx jsx */
import { jsx } from "theme-ui"
import RootThemeProvider from "../components/ThemeUIProvider"
import { useRouter } from "next/router"
import SocialImage from "../components/SocialImage"

function CustomApp({ Component, pageProps }) {
  if (pageProps.post) {
    const { coverImage, author, title, subPageType } = pageProps?.post

    switch (subPageType) {
      case "ogImage": {
        return (
          <SocialImage
            author={author}
            title={title}
            image={coverImage}
            width={1012}
            height={506}
          />
        )
      }
      case "instagramWithTitle": {
        return (
          <SocialImage
            author={author}
            title={title}
            image={coverImage}
            width={1080}
            height={1080}
          />
        )
      }
      case "instagram": {
        return (
          <SocialImage
            title={undefined}
            image={coverImage}
            width={1080}
            height={1080}
          />
        )
      }
      default: {
        // Use generic layout
      }
    }
  }

  return (
    <>
      <RootThemeProvider>
        <Component {...pageProps} />
      </RootThemeProvider>
    </>
  )
}

export default CustomApp
