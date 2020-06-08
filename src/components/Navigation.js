/* @jsx jsx */
import React from "react"
import { Flex, jsx, ThemeProvider } from "theme-ui"
import { Link } from "gatsby"
import theme, { aboutTheme, recipesTheme, whatTheme } from "../theme"

const NavLink = React.forwardRef((props, ref) => {
  const { sx, to, ...rest } = props
  return (
    <Link
      ref={ref}
      activeClassName="active"
      to={to}
      {...rest}
      sx={{
        position: "relative",
        color: "accent",
        textDecoration: "none",
        fontFamily: "heading",
        fontSize: 2,
        "&:hover": {
          color: "accent",
        },
        "&.active": {
          color: "accent",
        },
        ...sx,
      }}
    />
  )
})

const screens = [
  {
    title: "Home",
    to: "/",
    theme,
  },
  {
    title: "Was & Wie",
    to: "/#offers",
    theme: whatTheme,
  },
  {
    title: "Über mich",
    to: "/#about",
    theme: aboutTheme,
  },
  {
    title: "Rezepte",
    to: "/posts",
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
          ml: 3,
        },
        ...props.sx,
      }}
    >
      {screens.map(({ title, theme, to }) => {
        return (
          <ThemeProvider theme={theme}>
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
