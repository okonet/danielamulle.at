import fs from "fs";
import path from "path";
import React from "react";
import dynamic from "next/dynamic";

function Post(props) {
  console.log(props);
  const DynamicPost = dynamic(() =>
    import(`../content/posts/${props.filename}`)
  );
  return (
    <li>
      <h3>{props.filename}</h3>
      <DynamicPost />
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
