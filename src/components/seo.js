/** @jsx jsx */
import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { DefaultSeo } from "next-seo"
import { jsx } from "theme-ui"
import config from "../../site.config"

const openGraphService = "https://shotter.component-driven.dev/"

export function useCanonical() {
  const router = useRouter()
  return new URL(router.asPath, config.homepage)
}

function SEO({ description = config.description, title, ogImage }) {
  const { homepage, locale } = config
  const canonicalURL = useCanonical()
  const ogImagePath = ogImage
    ? `${openGraphService}api/screenshot?url=${canonicalURL}?ogImage`
    : `${homepage}/images/og-image.png`

  return (
    <DefaultSeo
      title={[title, config.title].join(" : ")}
      description={description}
      canonical={homepage}
      openGraph={{
        url: homepage,
        title: title,
        description,
        type: "website",
        locale,
        site_name: title,
        images: [
          {
            url: ogImagePath,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
    >
      <script async src="https://cdn.splitbee.io/sb.js" />
    </DefaultSeo>
    // <Helmet
    //   htmlAttributes={{
    //     lang: lang || site.siteMetadata.lang,
    //   }}
    //   title={siteTitle}
    //   titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
    //   meta={[
    //     {
    //       name: "viewport",
    //       content: "width=device-width, initial-scale=1.0, user-scalable=0",
    //     },
    //     {
    //       name: "title",
    //       property: "og:title",
    //       content: site.siteMetadata.title,
    //     },
    //     {
    //       name: "description",
    //       content: metaDescription,
    //     },
    //     {
    //       name: "author",
    //       content: site.siteMetadata.author,
    //     },
    //     {
    //       property: "og:description",
    //       content: metaDescription,
    //     },
    //     {
    //       property: "og:type",
    //       content: "website",
    //     },
    //     {
    //       property: "og:locale",
    //       content: site.siteMetadata.locale,
    //     },
    //     {
    //       name: "image",
    //       property: "og:image",
    //       content: ogImagePath,
    //     },
    //     {
    //       name: "twitter:card",
    //       content: "summary_large_image",
    //     },
    //     {
    //       name: "twitter:creator",
    //       content: site.siteMetadata.author,
    //     },
    //     {
    //       name: "twitter:title",
    //       content: siteTitle,
    //     },
    //     {
    //       name: "twitter:description",
    //       content: site.siteMetadata.description,
    //     },
    //     {
    //       name: "twitter:image",
    //       content: ogImagePath,
    //     },
    //   ].concat(meta)}
    // >
    //
    // </Helmet>
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  ogImage: PropTypes.bool,
}

export default SEO
