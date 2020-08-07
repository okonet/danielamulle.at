/* @jsx jsx */
import React from "react"
import {
  Box,
  Container,
  Flex,
  Input,
  Button,
  Label,
  jsx,
  Styled,
  ThemeProvider,
} from "theme-ui"
import Link from "../components/Link"
import { newsletterTheme } from "../theme"
import Group from "react-group"

function SubscribeForm() {
  return (
    <ThemeProvider theme={newsletterTheme}>
      <Box as="footer" sx={{ flexShrink: 1, bg: "background" }}>
        <Container
          variant="section"
          sx={{ bg: "transparent", color: "secondary", fontSize: 0 }}
        >
          <form>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="max@musterman.at"
            />
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" />
            <Button>Abonieren</Button>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default SubscribeForm
