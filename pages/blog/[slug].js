import React from "react";
import { renderToString } from "react-dom/server";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";

const Post = ({ date, title, html }) => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <>
      <h1>{title}</h1>
      <h2>Slug: {slug}</h2>
      <p>{date}</p>
      <section dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "first" } }, { params: { slug: "blog" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  // find the file in the /posts based on the slug
  const mdContent = await import(`../../content/posts/${slug}.md`);
  // Get the frontmatter data from each post using slug
  const { title, date, default: Content } = mdContent;
  const html = renderToString(
    <MDXProvider>
      <Content />
    </MDXProvider>
  );
  return { props: { title, date, html } };
}

export default Post;
