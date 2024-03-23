import React from "react";
import { useParams } from "react-router";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import ContentGetter from "./common/contentGetter";

const Profile = () => {
  const { user_id } = useParams();
  const renderData = (data) => {
    return <h1>Hi {data.username}</h1>;
  };

  return (
    <ContentGetter
      link={`users/${user_id}`}
      renderFunc={renderData}
      errorComponent={NotFound}
      pageName="user profile"
      wrapper={(children, loading) => (
        <CardDiv
          max-width="40rem"
          flex-direction="column"
          disabled={loading}
          center-text
        >
          {children}
        </CardDiv>
      )}
    />
  );
};

export default Profile;
