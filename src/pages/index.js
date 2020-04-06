import React from "react";
import { Grid } from "theme-ui";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Link from "../components/Link";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const IndexPage = () => {
  const portrait = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "portrait.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const imgData = portrait.placeholderImage.childImageSharp.fluid;
  return (
    <Layout>
      <SEO title="Home" />
      <Grid gap={3} sx={{
          height: "100vh",
          backgroundImage: `url(${imgData.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
      }}>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
