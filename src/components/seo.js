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
import { jsx } from "theme-ui"

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

  const metaDescription = description || site.siteMetadata.description
  const { src } = defaultImage.childImageSharp.original
  const ogImagePath = site.siteMetadata.url + (ogImage ? ogImage.path : src)
  let siteTitle = title || site.siteMetadata.title
  return (
    <Helmet
      htmlAttributes={{
        lang: lang || site.siteMetadata.lang,
      }}
      title={siteTitle}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
      meta={[
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
    />
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
}

export default SEO
