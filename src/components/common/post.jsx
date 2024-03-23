import React from "react";
import { Link } from "react-router-dom";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";

const PostLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.hoverPostLink};
  }
`;

const Post = ({ post, useVisbilityHook, onVisible }) => {
  return (
    <SecondaryCardDiv>
      <PostLink to={`/post/${post.post_id}`}>{post.title}</PostLink>
      <label>
        by{" "}
        <PostLink to={`/profile/${post.author_id}`}>
          {post.author_username}
        </PostLink>
      </label>
    </SecondaryCardDiv>
  );
};

export default Post;
