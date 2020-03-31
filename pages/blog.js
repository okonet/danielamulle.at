import fs from "fs";
import path from "path";
import React from "react";
import Link from "next/link";

function Post(props) {
  return (
    <li>
      <Link href={`blog/${props.filename.replace(".md", "")}`}>
        <a>{props.filename}</a>
      </Link>
    </li>
  );
}

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.fileName} {...post} />
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    // const meta = import(`../content/posts/${filename}`)
    // console.log(meta);

    return {
      filename,
      content: fileContents,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
