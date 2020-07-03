/* @jsx jsx */
import React from "react"
import { Flex, jsx, ThemeProvider } from "theme-ui"
import Link from "../components/Link"
import theme, { aboutTheme, howTheme, recipesTheme, whatTheme } from "../theme"
import { blogPath, recipesPath } from "../../paths"

const NavLink = React.forwardRef((props, ref) => {
  const { sx, to, ...rest } = props
  return (
    <Link
      ref={ref}
      to={to}
      partiallyActive
      {...rest}
      sx={{
        position: "relative",
        py: 1,
        px: 3,
        textDecoration: "none",
        borderRadius: "round",
        bg: "background",
        whiteSpace: "nowrap",
        ":hover": {
          bg: "primary",
          color: "background",
          textDecoration: "none",
        },
        "&.active": {
          bg: "primary",
          color: "background",
        },
        ...sx,
      }}
    />
  )
})

const pages = [
  {
    title: "Angebot",
    to: "/offers",
    theme: whatTheme,
  },
  {
    title: "Wie?",
    to: "/how",
    theme: howTheme,
  },
  {
    title: "Über mich",
    to: "/about",
    theme: aboutTheme,
  },
  {
    title: "Rezepte",
    to: `/${recipesPath}`,
    theme: recipesTheme,
  },
  {
    title: "Blog",
    to: `/${blogPath}`,
    theme: recipesTheme,
  },
]

const Navigation = (props) => {
  return (
    <Flex
      as="nav"
      {...props}
      sx={{
        transform: "translateZ(0)",
        alignItems: "center",
        "* + *": {
          ml: 2,
        },
        ...props.sx,
      }}
    >
      {pages.map(({ title, theme, to }) => {
        return (
          <ThemeProvider theme={theme} key={to}>
            <NavLink key={to} to={to}>
              {title}
            </NavLink>
          </ThemeProvider>
        )
      })}
    </Flex>
  )
}

export default Navigation
