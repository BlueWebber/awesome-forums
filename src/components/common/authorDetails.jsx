import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const DefaultPfp = styled(FontAwesomeIcon).attrs({
  icon: faUser,
})`
  font-size: 95px;
  grid-area: author;
  margin-bottom: 1rem;
  border-radius: 10px;
`;

const UserPfp = styled(DefaultPfp).attrs({ as: "img" })`
  width: 95px;
  height: 95px;
`;

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

const UsernameLabel = styled.label`
  font-weight: bold;
`;

const InfoLabel = styled.label`
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const AuthorDetails = ({ post }) => {
  return (
    <MainDiv>
      {post["author_pfp_link"] ? (
        <UserPfp src={post["author_pfp_link"]} />
      ) : (
        <DefaultPfp />
      )}
      <UsernameLabel>{post["author_username"]}</UsernameLabel>
      <InfoLabel>{post.author_number_of_posts} posts</InfoLabel>
    </MainDiv>
  );
};

export default AuthorDetails;
