/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { DefaultSeo } from "next-seo"
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
    />
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  ogImage: PropTypes.bool,
}

export default SEO
