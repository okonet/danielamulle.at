import React from "react";
import SEO from "./seo";
import Layout from "./layout";
import Link from "./Link";

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ul>
        {data.allBlogPost.edges.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
