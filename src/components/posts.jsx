import { useState, useRef, useEffect } from "react";
import Post from "./common/post";
import useAxios from "axios-hooks";
import CardDiv from "./styles/common/cardDiv";
import Paginator from "./common/paginator";
import Spinner from "./common/spinner";
import ErrorBox from "./common/errorBox";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [{ data, loading, error }, refetch] = useAxios(
    `posts/newest/${currentPage}/`
  );
  const [posts, setPosts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (!loading && !error) {
      setPosts(data["posts"]);
    }
  }, [data, loading, error]);

  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };

  const getContent = () => {
    if (error) {
      return <ErrorBox refetch={refetch} />;
    } else if (loading) {
      if (posts.length) {
        return (
          <>
            {posts.map((post) => (
              <Post post={post} key={post.post_id} />
            ))}
            ;
            <Spinner />
          </>
        );
      }
      return <Spinner />;
    } else if (posts.length) {
      return posts.map((post) => <Post post={post} key={post.post_id} />);
    }
  };

  return (
    <CardDiv
      max-width="40rem"
      flex-direction="column"
      ref={scrollRef}
      disabled={loading}
    >
      {getContent()}
      <div>
        {!loading && !error && (
          <Paginator
            numberOfPages={data["number_of_pages"]}
            handlePagination={onPagination}
            currentPage={currentPage}
            numberOfBoxes={9}
          />
        )}
      </div>
    </CardDiv>
  );
};

export default Posts;
