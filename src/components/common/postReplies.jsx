import UserContent from "./userContent";
import Spinner from "./spinner";
import ErrorBox from "./errorBox";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import useAxios from "axios-hooks";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Sorter from "./sorter";
import Paginator from "./paginator";
import { faNewspaper, faScroll } from "@fortawesome/free-solid-svg-icons";

const StyledPostContainer = styled(SecondaryCardDiv)`
  padding: 0;
`;

const WrapperDiv = styled.div`
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};
`;

const SorterDiv = styled.div`
  margin-top: 2rem;
`;

const PostReplies = ({ postId }) => {
  const [sortClause, setSortClause] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const [{ data, loading, error }, refetch] = useAxios(
    `/post_replies/${postId}/${sortClause}/${currentPage}`
  );
  const [replies, setReplies] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    !error && !loading && setReplies(data["replies"]);
  }, [data, loading, error]);

  const onSort = (key) => setSortClause(key);
  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };

  const getContent = () => {
    if (error) {
      return (
        <SecondaryCardDiv>
          <ErrorBox refetch={refetch} failedAt="replies" />
        </SecondaryCardDiv>
      );
    } else if (loading) {
      return (
        <SecondaryCardDiv>
          <Spinner />
        </SecondaryCardDiv>
      );
    } else if (replies) {
      return replies.map((reply, idx) => (
        <StyledPostContainer key={reply.reply_id} first={idx === 0}>
          <UserContent post={reply} reactions_type="reply_reactions" />
        </StyledPostContainer>
      ));
    }
  };

  return (
    <WrapperDiv disabled={loading}>
      <SorterDiv ref={scrollRef}>
        {data && (
          <Sorter
            clauses={{
              newest: { icon: faNewspaper, name: "New" },
              oldest: { icon: faScroll, name: "Old" },
            }}
            handleSort={onSort}
            currentClause={sortClause}
          />
        )}
      </SorterDiv>
      {getContent()}
      <div>
        {data && data["number_of_pages"] > 1 && (
          <Paginator
            numberOfPages={data["number_of_pages"]}
            handlePagination={onPagination}
            currentPage={currentPage}
            numberOfBoxes={9}
          />
        )}
      </div>
    </WrapperDiv>
  );
};

export default PostReplies;
