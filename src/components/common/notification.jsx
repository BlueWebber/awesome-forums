import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { UserPfpEx } from "../styles/common/userPfps";

const WrapperDiv = styled.div.attrs({ className: "slideIn" })`
  animation-delay: ${(props) => props.delay}s;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  padding: 10px;
  text-align: center;
`;

const StyledLink = styled(Link).attrs({ className: "post-link" })`
  text-decoration: underline;
`;

const Time = styled.time`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Paragraph = styled.p`
  margin-left: 15px;
  margin-bottom: 30px;
  text-align: start;
  font-size: 0.9rem;
`;

const Notification = ({ post: notification, idx }) => {
  const postDate = moment.unix(notification.date);

  return (
    <WrapperDiv delay={idx * 0.05}>
      <StyledDiv>
        <Link to={`/profile/${notification.author_id}`}>
          <UserPfpEx src={notification.author_pfp_link} display-size="30px" />
        </Link>
        <Paragraph>
          <StyledLink to={`/profile/${notification.author_id}`}>
            {notification.author_username}
          </StyledLink>{" "}
          {notification.notification_body + " "}
          <StyledLink
            to={`/post/${notification.post_id}${
              notification.post_type === "reply"
                ? "/" + notification.reply_id
                : ""
            }`}
          >
            {notification.post_type}
          </StyledLink>
        </Paragraph>
      </StyledDiv>
      <Time dateTime={postDate.toISOString()}>{postDate.format("lll")}</Time>
    </WrapperDiv>
  );
};

export default Notification;
