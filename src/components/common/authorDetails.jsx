import styled from "styled-components";
import { Link } from "react-router-dom";
import { DefaultPfp, UserPfp, UserPfpInput } from "../styles/common/userPfps";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  grid-area: author;
  border-right: 1px solid ${({ theme }) => theme.colors.greyBorder};
  padding-right: 1rem;
  padding-left: 1rem;
  word-wrap: break-word;
  word-break: break-all;
  flex-grow: 0;
  max-width: 95px;

  @media only screen and (max-width: 600px) {
    flex-direction: row;
    max-width: 100%;
    border: 0;
    padding: 0;
    align-items: stretch;

    & > * {
      margin-right: 1rem;
    }
  }
`;

const UsernameLabel = styled(Link).attrs({ className: "post-link" })`
  font-weight: bold;
`;

const InfoLabel = styled.label`
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const KarmaIcon = styled(FontAwesomeIcon).attrs({ icon: faPlusCircle })`
  margin-right: 0.3rem;
  color: ${({ theme }) => theme.colors.successButton};
`;

const AuthorDetails = ({ post, editable, onEditSubmit }) => {
  const WrapperLink = !editable ? Link : ({ children }) => <>{children}</>;
  return (
    <MainDiv>
      <WrapperLink to={`/profile/${post["author_id"]}`}>
        {editable ? (
          <UserPfpInput
            src={post["author_pfp_link"]}
            display-size="95px"
            onEditSubmit={onEditSubmit}
            mini-size="50px"
          />
        ) : post["author_pfp_link"] ? (
          <UserPfp
            src={post["author_pfp_link"]}
            display-size="95px"
            mini-size="50px"
          />
        ) : (
          <DefaultPfp display-size="95px" mini-size="50px" />
        )}
      </WrapperLink>
      <UsernameLabel to={`/profile/${post["author_id"]}`}>
        {post["author_username"]}
      </UsernameLabel>
      <InfoLabel>{post.author_number_of_posts} posts</InfoLabel>
      <InfoLabel>
        <KarmaIcon />
        {post.author_reputation}
      </InfoLabel>
    </MainDiv>
  );
};

export default AuthorDetails;
