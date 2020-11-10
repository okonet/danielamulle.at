/* @jsx jsx */
import React from "react"
import { Flex, jsx, ThemeProvider } from "theme-ui"
import Link from "../components/Link"
import {
  aboutTheme,
  blogTheme,
  recipesTheme,
  offersTheme,
  testimonialsTheme,
  projectsTheme,
} from "../theme"
import { blogPath, projectsPath, recipesPath } from "../../paths"

const pages = [
  {
    title: "Angebot",
    to: "/offers",
    theme: offersTheme,
  },
  // {
  //   title: "Referenzen",
  //   to: "testimonials",
  //   theme: testimonialsTheme,
  // },
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
  // {
  //   title: "Projekte",
  //   to: `/${projectsPath}`,
  //   theme: projectsTheme,
  // },
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
        mb: "3px",
        textDecoration: "none",
        fontWeight: "bold",
        borderBottom: "none",
        bg: "transparent",
        color: "primary",
        whiteSpace: "nowrap",
        ":hover": {
          mb: "2px",
          textDecoration: "none",
          borderBottom: "thin",
        },
        "&.active": {
          mb: 0,
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
        alignItems: "flex-end",
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
