/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react"
import { Box, Container, jsx } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"

function Header() {
  const [visible, setVisible] = useState(true)
  const [transparent, setTransparent] = useState(true)
  const prevScrollTop = useRef(0)
  useEffect(() => {
    const handleScroll = (event) => {
      // console.log(event.target.scrollingElement.scrollTop)
      const scrollTop = event.target.scrollingElement.scrollTop
      const delta = scrollTop - prevScrollTop.current
      if (delta > 0) {
        // Hide when scrolling down
        setVisible(false)
      } else {
        // Set visible if we're scrolling up
        setVisible(true)
        setTransparent(scrollTop <= 0)
      }
      prevScrollTop.current = scrollTop
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [visible, transparent, prevScrollTop])
  return (
    <Box
      as={"header"}
      sx={{
        position: "fixed",
        top: 0,
        py: 3,
        width: "100%",
        boxShadow: transparent ? "none" : "float",
        bg: transparent ? "transparent" : "background",
        zIndex: 10,
        transform: `translateY(${visible ? 0 : -100}%)`,
        transition: "all 0.5s ease-in-out",
        willChange: "transform, background, box-shadow",
        ":hover": {
          transform: `translateY(0%)`,
        },
      }}
    >
      <Container variant="full">
        <Box
          sx={{
            display: ["block", "flex", "flex"],
          }}
        >
          <Logo />
          <Navigation sx={{ ml: "auto" }} />
        </Box>
      </Container>
    </Box>
  )
}

export default Header
