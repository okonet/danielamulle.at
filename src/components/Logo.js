import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex, Text } from "theme-ui";

function Logo(props) {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "logo@2x.png" }) {
        childImageSharp {
          fixed(width: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Flex>
      <img {...data.image.childImageSharp.fixed} alt="Logo" />
      <Box sx={{ ml: 2 }}>
        <Text as="p" sx={{ m: 0, fontFamily: "body", fontSize: 0 }}>
          Diätologin & Ernährungswissenschafterin
        </Text>
        <Text
          as="h1"
          sx={{ m: 0, fontFamily: "heading", fontWeight: "body", fontSize: 5 }}
        >
          Daniela Mulle
        </Text>
      </Box>
    </Flex>
  );
}

export default Logo;
