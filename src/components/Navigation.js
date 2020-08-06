/* @jsx jsx */
import React from "react"
import { Flex, jsx, ThemeProvider } from "theme-ui"
import Link from "../components/Link"
import {
  aboutTheme,
  blogTheme,
  howTheme,
  recipesTheme,
  offersTheme,
} from "../theme"
import { blogPath, recipesPath } from "../../paths"

const pages = [
  {
    title: "Angebot",
    to: "/offers",
    theme: offersTheme,
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
    theme: blogTheme,
  },
]

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
        px: 0,
        textDecoration: "none",
        fontWeight: "bold",
        borderRadius: "none",
        borderBottom: "none",
        bg: "transparent",
        whiteSpace: "nowrap",
        ":hover": {
          textDecoration: "none",
          borderBottom: "thin",
        },
        "&.active": {
          borderBottom: "thick",
        },
        ...sx,
      }}
    />
  )
})

const Navigation = (props) => {
  return (
    <Flex
      as="nav"
      {...props}
      sx={{
        alignItems: "center",
        overflow: "auto",
        "::-webkit-scrollbar": {
          width: 0,
          background: "transparent",
        },
        "* + *": {
          ml: 3,
        },
        "@media print": {
          display: "none",
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
