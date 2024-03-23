import { useState, useRef } from "react";
import Post from "./common/post";
import useAxios from "axios-hooks";
import CardDiv from "./styles/common/cardDiv";
import Loader from "./common/loader";
import Paginator from "./common/paginator";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef();
  const [{ data, loading, error }, refetch] = useAxios(
    `posts/newest/${currentPage}/`
  );

  const fetchContent = () => {
    return loading || error ? (
      <Loader error={error} refetch={refetch} />
    ) : (
      data["posts"].map((post) => <Post post={post} key={post.post_id} />)
    );
  };

  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(index);
  };

  return (
    <CardDiv max-width="40rem" flex-direction="column" ref={scrollRef}>
      {fetchContent()}
      <div>
        {!loading && !error ? (
          <Paginator
            numberOfPages={data["number_of_pages"]}
            handlePagination={onPagination}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </CardDiv>
  );
};

export default Posts;
