/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

const openGraphService = "https://component-driven.dev/"

function SEO({ description, lang, meta, title, ogImage }) {
  const { site, defaultImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            lang
            locale
          }
        }
        defaultImage: file(relativePath: { eq: "og-image.png" }) {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    `
  )
  const location = useLocation()
  const metaDescription = description || site.siteMetadata.description
  const canonicalURL = new URL(location.pathname, site.siteMetadata.url)
  const { src } = defaultImage.childImageSharp.original
  const ogImagePath = ogImage
    ? `${openGraphService}api/screenshot?url=${canonicalURL}?ogImage`
    : src

  const siteTitle = title || site.siteMetadata.title
  return (
    <Helmet
      htmlAttributes={{
        lang: lang || site.siteMetadata.lang,
      }}
      title={siteTitle}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
      meta={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, user-scalable=0",
        },
        {
          name: "title",
          property: "og:title",
          content: site.siteMetadata.title,
        },
        {
          name: "description",
          content: metaDescription,
        },
        {
          name: "author",
          content: site.siteMetadata.author,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:locale",
          content: site.siteMetadata.locale,
        },
        {
          name: "image",
          property: "og:image",
          content: ogImagePath,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.author,
        },
        {
          name: "twitter:title",
          content: siteTitle,
        },
        {
          name: "twitter:description",
          content: site.siteMetadata.description,
        },
        {
          name: "twitter:image",
          content: ogImagePath,
        },
      ].concat(meta)}
    >
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Yeseva+One&display=swap"
        rel="stylesheet"
      />
      <script async src="https://cdn.splitbee.io/sb.js" />
    </Helmet>
  )
}

SEO.defaultProps = {
  meta: [],
  description: "",
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  ogImage: PropTypes.bool,
}

export default SEO
