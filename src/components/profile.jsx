import React from "react";
import { useParams } from "react-router";
import NotFound from "./notFound";
import useAxios from "axios-hooks";
import Loader from "./common/loader";
import CardDiv from "./styles/common/cardDiv";

const Profile = (props) => {
  const { user_id } = useParams();
  const [{ data, loading, error }, refetch] = useAxios(`users/${user_id}`);

  const renderContents = () => {
    if (error && error.response.status === 404) return <NotFound />;
    return loading || error ? (
      <Loader error={error} refetch={refetch} />
    ) : (
      <CardDiv>
        {data.map((item) => (
          <h2>{item}</h2>
        ))}
      </CardDiv>
    );
  };

  return renderContents();
};

export default Profile;
