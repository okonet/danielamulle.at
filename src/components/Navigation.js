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
        color: "text",
        textDecoration: "none",
        fontFamily: "heading",
        fontSize: 3,
        transition: "all 0.25s",
        "&:hover": {
          color: activeColor,
          fontSize: 5,
        },
        "&.active": {
          color: activeColor,
          fontSize: 5,
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
    color: "#ff0055",
  },
  {
    title: "Blog",
    to: "/posts",
    color: "#0099ff",
  },
  {
    title: "About",
    to: "/about",
    color: "#22cc88",
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
        gap: 3,
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
