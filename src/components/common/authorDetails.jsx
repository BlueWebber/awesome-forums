import styled from "styled-components";
import { DefaultPfp, UserPfp } from "../styles/common/userPfps";

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
        <UserPfp src={post["author_pfp_link"]} display-size="95px" />
      ) : (
        <DefaultPfp display-size="95px" />
      )}
      <UsernameLabel>{post["author_username"]}</UsernameLabel>
      <InfoLabel>{post.author_number_of_posts} posts</InfoLabel>
    </MainDiv>
  );
};

export default AuthorDetails;
