import React from "react";
import { Link } from "react-router-dom";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";
import Highlighter from "react-highlight-words";

const PostLink = styled(Link)`
  margin-bottom: 0.3rem;

  &:hover {
    & > * {
      color: ${({ theme }) => theme.colors.hoverPostLink};
    }
  }
`;

const Highlighted = styled(Highlighter)`
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primaryText : theme.colors.secondaryText};
  transition: 0.15s ease-in-out;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const Post = ({ search, post }) => {
  const postDate = new Date(post.date);

  const getReplyString = () => {
    const numberOfReplies = post["number_of_replies"];
    if (numberOfReplies === 0) return "No replies";
    if (numberOfReplies === 1) return "1 reply";
    if (numberOfReplies > 1) return `${numberOfReplies} replies`;
  };

  return (
    <SecondaryCardDiv>
      <PostLink to={`/post/${post.post_id}`}>
        <Highlighted
          primary="true"
          highlightClassName="highlight-text"
          textToHighlight={post.title}
          searchWords={[search]}
          autoEscape={true}
        />
      </PostLink>
      <StyledLabel>
        by{" "}
        <PostLink to={`/profile/${post.author_id}`}>
          {post.author_username}
        </PostLink>
        {", "}
        {postDate.toDateString()}
      </StyledLabel>
      <StyledLabel>{getReplyString()}</StyledLabel>
    </SecondaryCardDiv>
  );
};

export default Post;
