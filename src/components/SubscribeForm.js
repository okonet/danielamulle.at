/* @jsx jsx */
import React from "react"
import { Box, Button, Container, Grid, Input, jsx, Styled } from "theme-ui"

function SubscribeForm() {
  return (
    <Box as="section" sx={{ bg: "background" }}>
      <Container
        variant="section"
        sx={{
          mt: [4, 4],
          bg: "white",
        }}
      >
        <Styled.h2 sx={{ mt: 0, mb: 3 }}>Newsletter abonnieren</Styled.h2>
        <Grid
          as="form"
          action="https://danielamulle.us17.list-manage.com/subscribe/post?u=7d58dda41d060572975e93fbb&amp;id=61190d8c33"
          method="post"
          name="mc-embedded-subscribe-form"
          target="_blank"
          sx={{
            gridTemplateColumns: ["auto", "1fr 1fr auto"],
          }}
        >
          <Input
            type="email"
            id="email"
            name="EMAIL"
            required
            placeholder="Email"
            aria-label="Email"
          />
          <Input
            type="text"
            id="fname"
            name="FNAME"
            required
            placeholder="Name"
            aria-label="Name"
          />
          <Button type="submit">Abonnieren</Button>
        </Grid>
      </Container>
    </Box>
  )
}

export default SubscribeForm
