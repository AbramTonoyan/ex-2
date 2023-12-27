import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import classes from "./index.module.css";
type Props = {};

const Comment: FC<Props> = () => {
  const [comment, setComment] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const rawCommentId = router.query.id;
  const commentId =
    typeof rawCommentId === "string" ? Number(rawCommentId) : undefined;

  console.log(commentId);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        setComment(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching ", error);
        setLoading(false);
      });

    fetch(`https://jsonplaceholder.typicode.com/posts?id=${commentId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching ", error);
        setLoading(false);
      });
  }, [commentId]);

  console.log(comment);

  return (
    <div>
      <h1>Your Page</h1>
      <p>User ID: {commentId}</p>
      <ul>
        {posts &&
          posts.map((post) => (
            <li className={classes.li_post} key={post.id}>
              {post.id}

              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        {comment &&
          comment.map((value) => {
            return (
              <li className={classes.li} key={value.id}>
                <h2>{value.id}</h2>
                <h3>{value.name}</h3>
                <h4>{value.email}</h4>
                <h5>{value.body}</h5>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Comment;
