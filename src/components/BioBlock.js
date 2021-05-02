/* @jsx jsx */
import * as React from "react"
import { Styled, Container, jsx } from "theme-ui"
import AboutBlock from "./AboutBlock"

export default function BioBlock(props) {
  return (
    <Container
      variant="section"
      sx={{
        bg: "muted",
      }}
      {...props}
    >
      <AboutBlock sx={{ mb: [0, -4] }}>
        <Styled.h2>Ich bin Daniela und weiß, wovon ich rede...</Styled.h2>
        <Styled.p>
          denn ich bin Diätologin & Ernährungswissenschafterin.
        </Styled.p>
        <Styled.p>
          Ich helfe meinen KundInnen mit Gewichtsproblemen oder Darmbeschwerden
          dabei, sich in ihrem Körper endlich wieder wohlzufühlen. Je
          kniffeliger der Fall, umso besser, denn schließlich bin ich ja eine
          Bauchdetektivin.
        </Styled.p>
        <Styled.ul>
          <Styled.li>
            Von wem also könntest du besser lernen, was auch wirklich
            funktioniert?
          </Styled.li>
          <Styled.li>
            Wer könnte dir bessere Tipps & Tricks für deine Ernährung geben?
          </Styled.li>
        </Styled.ul>
        <Styled.p>
          <Styled.em>
            Hol dir meine kostenlose Email-Miniserie und überzeuge dich selbst!
          </Styled.em>
        </Styled.p>
      </AboutBlock>
    </Container>
  )
}
