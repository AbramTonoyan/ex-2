import React, { useEffect, useState } from "react";
import PostsLink from "./posts";

type Props = {};

const Index = (props: Props) => {
  const [users, setUsers] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users &&
            users.map((user: any) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <PostsLink id={user.id}></PostsLink>
                <hr />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
