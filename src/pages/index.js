import React from "react";
import {Grid} from "theme-ui";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Link from "../components/Link";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Grid gap={3}>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/blog/">Blog</Link>
    </Grid>
  </Layout>
);

export default IndexPage;
