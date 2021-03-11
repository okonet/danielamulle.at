/* @jsx jsx */
import { jsx } from "theme-ui"
import RootThemeProvider from "../components/ThemeUIProvider"
import SocialImage from "../components/SocialImage"
import Head from "next/head"
import SEO from "../components/seo"
// import CookieConsent from "./CookieConsent"
import config from "../../site.config"

function CustomApp({ Component, pageProps }) {
  const { pageType, post } = pageProps

  if (post) {
    const { coverImage, author, title } = post

    switch (pageType) {
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
      <SEO title={post.title || config.title} ogImage={!!post?.coverImage} />
      <Head>
        <script
          type="text/javascript"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
      </Head>
      <RootThemeProvider>
        <Component {...pageProps} />
      </RootThemeProvider>
    </>
  )
}

export default CustomApp
