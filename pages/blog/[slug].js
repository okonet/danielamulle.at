import { useRouter } from "next/router";
import ReactDOMServer from "react-dom/server";
import MDX from "@mdx-js/runtime";

const Post = ({ date, title, content }) => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(content);

  return (
    <>
      <h1>{title}</h1>
      <h2>Slug: {slug}</h2>
      <p>{date}</p>
      <section dangerouslySetInnerHTML={{ __html: content }} />
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
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()
  const { title, date } = mdContent;
  const html = ReactDOMServer.renderToString(<MDX>{mdContent.default}</MDX>);
  console.log("html", html);
  // const content = JSON.stringify(mdContent.default)

  return { props: { title, date, content: html } };
}

export default Post;
