import React from "react";
import { useParams } from "react-router";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import useContentGetter from "../hooks/useContentGetter";
import AuthorDetails from "./common/authorDetails";
import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 2rem;
  }
`;

const Profile = () => {
  const { user_id } = useParams();
  const { loading, data, ContentGetter } = useContentGetter({
    link: `users/${user_id}`,
    pageName: "user profile",
    handlerComponents: {
      404: NotFound,
    },
  });
  return (
    <CardDiv
      max-width="40rem"
      flex-direction="column"
      disabled={loading}
      center-text
    >
      <ContentGetter>
        <ContainerDiv>
          {data && (
            <AuthorDetails
              post={{
                author_username: data.username,
                author_id: data.user_id,
                author_pfp_link: data.pfp_link,
                author_number_of_posts: data.number_of_posts,
                author_reputation: data.reputation,
              }}
            />
          )}
          <label>{data && data.username}</label>
        </ContainerDiv>
      </ContentGetter>
    </CardDiv>
  );
};

export default Profile;
