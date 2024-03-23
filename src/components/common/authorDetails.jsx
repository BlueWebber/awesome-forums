import styled from "styled-components";
import { Link } from "react-router-dom";
import { DefaultPfp, UserPfp } from "../styles/common/userPfps";
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

const AuthorDetails = ({ post }) => {
  return (
    <MainDiv>
      <Link to={`/profile/${post["author_id"]}`}>
        {post["author_pfp_link"] ? (
          <UserPfp src={post["author_pfp_link"]} display-size="95px" />
        ) : (
          <DefaultPfp display-size="95px" />
        )}
      </Link>
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
