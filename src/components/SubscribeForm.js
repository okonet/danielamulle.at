/* @jsx jsx */
import React from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  jsx,
  Label,
  Styled,
} from "theme-ui"

function SubscribeForm() {
  return (
    <Box as="section" sx={{ bg: "background" }}>
      <Container
        variant="section"
        sx={{
          mt: [4, 4],
          bg: "transparent",
        }}
      >
        <Styled.h2 sx={{ mt: 0, mb: 3 }}>Newsletter</Styled.h2>
        <Styled.p>
          Verpasse keine meiner tollen Tipps & Tricks, interessanten Infos &
          köstlichen Rezepte.
        </Styled.p>
        <Grid
          as="form"
          action="https://danielamulle.us17.list-manage.com/subscribe/post?u=7d58dda41d060572975e93fbb&amp;id=61190d8c33"
          method="post"
          name="mc-embedded-subscribe-form"
          target="_blank"
          sx={{
            alignItems: "flex-end",
            gridTemplateColumns: ["auto", "1fr 1fr auto"],
          }}
        >
          <Box>
            <Label htmlFor="email" sx={{ mb: 1 }}>
              Deine Email-Adresse
            </Label>
            <Input
              type="email"
              id="email"
              name="EMAIL"
              required
              placeholder="max@mustermann.at"
            />
          </Box>
          <Box>
            <Label htmlFor="fname" sx={{ mb: 1 }}>
              Dein Name
            </Label>
            <Input type="text" id="fname" name="FNAME" required />
          </Box>
          <Button type="submit">Abonnieren</Button>
        </Grid>
      </Container>
    </Box>
  )
}

export default SubscribeForm
