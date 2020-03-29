/** @jsx jsx */
import React from "react";
import {Card, Grid, jsx} from "theme-ui";
import Link from "../components/Link";
import Layout from "../components/layout";

export default ({ posts }) => (
  <Layout>
    <Grid gap={3} columns={[1,2,4]}>
      {posts.map(post => (
        <Card key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
        </Card>
      ))}
    </Grid>
  </Layout>
);
