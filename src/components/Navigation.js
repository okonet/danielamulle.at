/* @jsx jsx */
import React from "react"
import { Flex, jsx } from "theme-ui"
import { Link } from "gatsby"

const NavLink = React.forwardRef((props, ref) => {
  const { activeColor, sx, ...rest } = props
  return (
    <Link
      ref={ref}
      activeClassName="active"
      {...rest}
      sx={{
        position: "relative",
        color: activeColor,
        textDecoration: "none",
        fontFamily: "heading",
        fontSize: 4,
        "&:hover": {
          color: activeColor,
        },
        "&.active": {
          color: activeColor,
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
    color: "pink.3",
  },
  {
    title: "Rezepte",
    to: "/posts",
    color: "orange.3",
  },
  {
    title: "About",
    to: "/about",
    color: "green.3",
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
        gap: 4,
        ...props.sx,
      }}
    >
      {screens.map(({ title, color, to }) => {
        return (
          <NavLink key={to} to={to} activeColor={color}>
            {title}
          </NavLink>
        )
      })}
    </Flex>
  )
}

export default Navigation
