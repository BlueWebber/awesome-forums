import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div
      className="row m-3"
      style={{ backgroundColor: "#1b1e1f", padding: 10 }}
    >
      <Link className="postLink" to={`/post/${post.title}`}>
        {post.title}
      </Link>
      <label>
        by{" "}
        <Link className="postLink" to={`/profile/${post.author_id}`}>
          {post.author_username}
        </Link>
      </label>
    </div>
  );
};

export default Post;
