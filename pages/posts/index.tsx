import Link from "next/link";
import React, { FC } from "react";

type Props = { id: number };

const PostsLink: FC<Props> = ({ id }) => {
  return <Link href={`/posts/${id}`}>View Details</Link>;
};

export default PostsLink;
