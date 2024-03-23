import CardDiv from "./styles/common/cardDiv";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import useAxios from "axios-hooks";

const MainPost = () => {
  const [{ data, loading, error }, refetch] = useAxios("post");
  return (
    <CardDiv max-width="40rem" flex-direction="column" disabled={loading}>
      <SecondaryCardDiv></SecondaryCardDiv>
    </CardDiv>
  );
};

export default MainPost;
