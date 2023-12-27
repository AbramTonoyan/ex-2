import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import classes from "./index.module.css";
import CommentsLink from "../comments";

type Props = {};

const Post: FC<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const rawUserId = router.query.id;
  const userId = typeof rawUserId === "string" ? Number(rawUserId) : undefined;

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (userId !== undefined) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching data");
          console.error("Error fetching ", error);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      <h1>Your Page</h1>
      <p>User ID: {userId}</p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((value) => (
            <li className={classes.li} key={value.id}>
              <p>{value.id}</p>
              <p>{value.title}</p>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
              <CommentsLink id={value.id} postId={userId}></CommentsLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;
