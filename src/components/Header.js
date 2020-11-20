/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react"
import { Box, Container, jsx } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"

const SCROLL_THRESHOLD = 30

function Header() {
  let scrollTop = 0
  if (window) {
    scrollTop = window.document.scrollingElement.scrollTop
  }
  const [visible, setVisible] = useState(scrollTop === 0)
  const [transparent, setTransparent] = useState(scrollTop === 0)
  const prevScrollTop = useRef(scrollTop)
  useEffect(() => {
    const handleScroll = (event) => {
      const { scrollTop, scrollHeight } = event.target.scrollingElement
      const clampedScrollTop = Math.max(0, Math.min(scrollTop, scrollHeight))
      const delta = clampedScrollTop - prevScrollTop.current
      if (delta > SCROLL_THRESHOLD) {
        // Hide when scrolling down
        if (visible) {
          setVisible(false)
        }
        prevScrollTop.current = clampedScrollTop
      } else if (delta < -SCROLL_THRESHOLD) {
        // Set visible if we're scrolling up
        if (!visible) {
          setVisible(true)
        }
        prevScrollTop.current = clampedScrollTop
      }
      setTransparent(scrollTop <= 0)
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
