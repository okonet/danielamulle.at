/* @jsx jsx */
import React from "react"
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Input,
  jsx,
  Label,
  Styled,
  Spinner,
} from "theme-ui"
import Link from "./Link"

const states = {
  IDLE: "idle",
  SUBMITTING: "submitting",
  OK: "ok",
  ERROR: "error",
}

function SubscribeForm() {
  const [state, setState] = React.useState(states.IDLE)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    setState(states.SUBMITTING)
    try {
      await fetch("https://danielamulle.activehosted.com/proc.php", {
        method: "POST",
        body: data,
        mode: "no-cors",
      })
      setState(states.OK)
    } catch (error) {
      setState(states.ERROR)
      console.error("Request failed", error)
    }
  }
  return (
    <>
      {state === states.ERROR && (
        <Alert variant="error" mb={2}>
          Es ist ein Fehler aufgetreten. Probiere noch ein Mal.
        </Alert>
      )}
      {state === states.OK && (
        <Alert variant="success" mb={2}>
          Danke! Checke Dein Email...
        </Alert>
      )}
      <Grid
        as="form"
        method="post"
        onSubmit={handleSubmit}
        sx={{
          alignItems: "flex-end",
          gridTemplateColumns: ["auto", "1fr 1fr auto"],
        }}
      >
        <input type="hidden" name="u" value="1" />
        <input type="hidden" name="f" value="1" />
        <input type="hidden" name="s" />
        <input type="hidden" name="c" value="0" />
        <input type="hidden" name="m" value="0" />
        <input type="hidden" name="act" value="sub" />
        <input type="hidden" name="v" value="2" />
        <Box>
          <Label htmlFor="email" sx={{ mb: 1 }}>
            Deine Email-Adresse
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="max@mustermann.at"
            required
            disabled={state === states.SUBMITTING}
          />
        </Box>
        <Box>
          <Label htmlFor="firstname" sx={{ mb: 1 }}>
            Dein Vorname
          </Label>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            required
            disabled={state === states.SUBMITTING}
          />
        </Box>
        <Button type="submit" disabled={state === states.SUBMITTING}>
          {state === states.SUBMITTING && (
            <Spinner
              sx={{ color: "white", width: 18, height: 18, mb: "-3px" }}
            />
          )}{" "}
          Abonnieren
        </Button>
        <Styled.p
          sx={{
            m: 0,
            variant: "textStyles.disclaimer",
            gridColumnStart: 1,
            gridColumnEnd: [1, 4],
          }}
        >
          Mit Deiner Anmeldung stimmst Du meiner{" "}
          <Link to="/datenschutz">Datenschutzerklärung</Link> zu.
        </Styled.p>
      </Grid>
    </>
  )
}

export default SubscribeForm
