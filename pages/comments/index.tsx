import Link from "next/link";
import React, { FC } from "react";

type Props = { id: number; postId: number };

const CommentsLink: FC<Props> = ({ id, postId }) => {
  return <Link href={`/comments/${id}?/postId=${postId}`}>View Details</Link>;
};

export default CommentsLink;
