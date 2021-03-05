/* @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import PhoneIcon from "./PhoneIcon"
import MailIcon from "./MailIcon"
import config from "../../site.config"

function ContactInfo(props) {
  const { phone, email } = config
  switch (props.type) {
    case "phone": {
      return (
        <span sx={{ whiteSpace: "nowrap" }}>
          <Styled.a href={`tel:${phone}`}>
            <PhoneIcon width={16} sx={{ mr: 1, mb: -1 }} />
            {phone}
          </Styled.a>
        </span>
      )
    }
    case "email": {
      return (
        <span sx={{ whiteSpace: "nowrap" }}>
          <Styled.a href={`mailto:${email}`}>
            <MailIcon width={16} sx={{ mr: 1, mb: -1 }} />
            {email}
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
