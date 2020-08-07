/* @jsx jsx */
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PhoneIcon from "./PhoneIcon"
import { jsx, Styled } from "theme-ui"
import MailIcon from "./MailIcon"

function ContactInfo(props) {
  const { site } = useStaticQuery(graphql`
    query ContactInfoQuery {
      site {
        siteMetadata {
          phone
          email
        }
      }
    }
  `)
  switch (props.type) {
    case "phone": {
      return (
        <span sx={{ whiteSpace: "nowrap" }}>
          <Styled.a href={`tel:${site.siteMetadata.phone}`}>
            <PhoneIcon width={16} sx={{ mr: 1, mb: -1 }} />
            {site.siteMetadata.phone}
          </Styled.a>
        </span>
      )
    }
    case "email": {
      return (
        <span sx={{ whiteSpace: "nowrap" }}>
          <Styled.a href={`mailto:${site.siteMetadata.email}`}>
            <MailIcon width={16} sx={{ mr: 1, mb: -1 }} />
            {site.siteMetadata.email}
          </Styled.a>
        </span>
      )
    }
    default: {
      return null
    }
  }
}

export default ContactInfo
