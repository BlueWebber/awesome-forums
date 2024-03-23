import React from "react";
import { Link } from "react-router-dom";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const PostLink = styled(Link)`
  margin-bottom: 0.3rem;

  &:hover {
    & > * {
      color: ${({ theme }) => theme.colors.hoverPostLink};
    }
  }
`;

const UserPostLink = styled(PostLink)`
  color: ${({ theme }) => theme.colors.secondaryText};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const Highlighted = styled(Highlighter)`
  color: ${({ theme }) => theme.colors.primaryText};
  transition: 0.15s ease-in-out;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const PinIcon = styled(FontAwesomeIcon).attrs({ icon: faThumbtack })`
  font-size: 1rem;
  margin-right: 0.7rem;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const WrapperDiv = styled(SecondaryCardDiv).attrs({ className: "slideIn" })`
  animation-delay: ${(props) => props.delay}s;
`;

const Post = ({ search, post, idx }) => {
  const postDate = moment.unix(post.date);

  const getReplyString = () => {
    const numberOfReplies = post["number_of_replies"];
    if (numberOfReplies === 0) return "No replies";
    if (numberOfReplies === 1) return "1 reply";
    if (numberOfReplies > 1) return `${numberOfReplies} replies`;
  };

  return (
    <WrapperDiv delay={idx * 0.05}>
      <div>
        {post.is_pinned ? <PinIcon /> : null}
        <PostLink to={`/post/${post.post_id}`}>
          <Highlighted
            highlightClassName="highlight-text"
            textToHighlight={post.title}
            searchWords={[search]}
            autoEscape={true}
          />
        </PostLink>
      </div>
      <StyledLabel>
        by{" "}
        <UserPostLink to={`/profile/${post.author_id}`}>
          {post.author_username}
        </UserPostLink>
        {", "}
        <time dateTime={postDate.toISOString()}>{postDate.format("lll")}</time>
      </StyledLabel>
      <StyledLabel>{getReplyString()}</StyledLabel>
    </WrapperDiv>
  );
};

export default Post;
