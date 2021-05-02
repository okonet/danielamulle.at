/* @jsx jsx */
import React from "react"
import { Styled, Flex, jsx, ThemeProvider } from "theme-ui"
import Link from "next/link"
import {
  aboutTheme,
  blogTheme,
  recipesTheme,
  offersTheme,
  testimonialsTheme,
  projectsTheme,
} from "../theme"
import { blogPath, projectsPath, recipesPath } from "../../paths"
import { useRouter } from "next/router"

const pages = [
  {
    title: "Angebot",
    href: "/offers",
    theme: offersTheme,
  },
  // {
  //   title: "Referenzen",
  //   href: "testimonials",
  //   theme: testimonialsTheme,
  // },
  {
    title: "Über mich",
    href: "/about",
    theme: aboutTheme,
  },
  {
    title: "Rezepte",
    href: `/${recipesPath}`,
    theme: recipesTheme,
  },
  {
    title: "Blog",
    href: `/${blogPath}`,
    theme: blogTheme,
  },
  {
    title: "Projekte",
    href: `/${projectsPath}`,
    theme: projectsTheme,
  },
]

const NavLink = React.forwardRef((props, ref) => {
  const { sx, href = "/", children, ...rest } = props
  const router = useRouter()
  const isActive = router.asPath.includes(href)
  return (
    <Link href={href} passHref {...rest}>
      <Styled.a
        ref={ref}
        className={isActive ? "active" : undefined}
        sx={{
          position: "relative",
          py: 1,
          px: 0,
          mb: "3px",
          textDecoration: "none",
          fontFamily: "body",
          fontWeight: "bold",
          fontSize: 1,
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
      >
        {children}
      </Styled.a>
    </Link>
  )
})

export default function Navigation(props) {
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
      {pages.map(({ title, theme, href }) => {
        return (
          <ThemeProvider theme={theme} key={href}>
            <NavLink href={href}>{title}</NavLink>
          </ThemeProvider>
        )
      })}
    </Flex>
  )
}
