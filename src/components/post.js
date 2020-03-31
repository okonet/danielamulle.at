import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "./layout";

export default (props) => {
  return (
    <Layout>
      <h1>{props.data.blogPost.title}</h1>
      <MDXRenderer>{props.data.blogPost.body}</MDXRenderer>
    </Layout>
  );
};
