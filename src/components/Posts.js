import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Link from "../components/Link";

export default ({ data }) => {
    console.log(data);
    return (
        <Layout>
            <SEO title="Blog" />
            <ul>
                {data.allMdx.edges.map(({ node: post }) => (
                    <li key={post.id}>
                        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                    </li>
                ))}
            </ul>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Layout>
    );
};
