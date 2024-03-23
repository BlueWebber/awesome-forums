import React from "react";
import { useParams } from "react-router";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import useContentGetter from "../hooks/useContentGetter";

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
        <h1>Hi {data && data.username}</h1>
      </ContentGetter>
    </CardDiv>
  );
};

export default Profile;
