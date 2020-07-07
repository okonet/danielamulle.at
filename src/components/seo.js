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
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: ogImagePath,
        },
        {
          name: `og:image:alt`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:image`,
          content: ogImagePath,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: "de",
  meta: [],
  description: "",
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
