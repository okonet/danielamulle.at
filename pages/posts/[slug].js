import { useRouter } from "next/router";

const Post = ({ date, title, children }) => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <>
      <h1>{title}</h1>
      <h2>Slug: {slug}</h2>
      <p>{date}</p>
      {children}
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
  console.log(mdContent);
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()
  const { title, date } = mdContent;

  return { props: { title, date, children: mdContent.default } };
}

export default Post;
