/* @jsx jsx */
import React from "react"
import { Box, jsx, Text, Image } from "theme-ui"
import Link from "next/link"
import config from "../../site.config"

function Logo({ variant = "full", size = 64 }) {
  const { author, role } = config

  return (
    <Link href={"/"} passHref>
      <a
        sx={{
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
          img: {
            transition: "transform 0.5s",
          },
          ":hover img": {
            transform: "rotate(360deg)",
          },
        }}
      >
        <Image
          alt="Logo"
          src="/images/logo@2x.png"
          width={size}
          height={size}
        />
        {variant === "full" && (
          <Box sx={{ ml: 1, position: "relative" }}>
            <Text
              as="h1"
              sx={{
                m: 0,
                color: "text",
                fontFamily: "heading",
                fontWeight: "normal",
                fontSize: 2,
              }}
            >
              {author}
            </Text>
            <Text
              as="p"
              sx={{
                display: ["none", "block"],
                m: 0,
                ml: "1px",
                color: "secondary",
                fontFamily: "monospace",
                fontSize: "11px",
                fontStyle: "italic",
                maxWidth: ["20ch", "20ch", "20ch", "40ch"],
              }}
            >
              {role}
            </Text>
          </Box>
        )}
      </a>
    </Link>
  )
}

export default Logo
