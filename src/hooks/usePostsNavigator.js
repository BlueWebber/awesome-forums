import { useState, useRef, useEffect } from "react";
import CardDiv from "../components/styles/common/cardDiv";
import Paginator from "../components/common/paginator";
import Sorter from "../components/common/sorter";
import Search from "../components/common/input/search";
import styled from "styled-components";
import useContentGetter from "./useContentGetter";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostsNavigatorComponent = ({
  withSearch,
  wrapperComponent: WrapperComponent,
  actionButton: ActionButton,
  postsKey,
  sortClauses,
  maxWidth,
  noContentHandler: NoContentHandler,
  mappingComponent: MappingComponent,
  children,
  setCurrentPage,
  setCurrentSortClause,
  search,
  setSearch,
  sortClause,
  currentPage,
  data,
  loading,
  contentGetter: ContentGetter,
  idKey,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const scrollRef = useRef();

  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };

  const onSort = (key) => {
    setCurrentSortClause(key);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput === search) return;
    setCurrentPage(0);
    setSearch(searchInput);
  };

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchReset = () => {
    setSearchInput("");
    if (search) {
      setSearch("");
    }
  };

  const posts = data ? data[postsKey] : [];

  const Wrapper = !WrapperComponent ? CardDiv : WrapperComponent;

  return (
    <Wrapper
      max-width={maxWidth}
      flex-direction="column"
      ref={scrollRef}
      disabled={loading}
    >
      <ContentGetter>
        <div>
          {data && data[postsKey] && data[postsKey].length && sortClauses ? (
            <Sorter
              clauses={sortClauses}
              handleSort={onSort}
              currentClause={sortClause}
            />
          ) : null}
        </div>
        {withSearch && (data || search) && (
          <SearchWrapper>
            <Search
              label="Search posts"
              id="searchQuery"
              value={searchInput}
              onChange={onSearch}
              onSubmit={onSearchSubmit}
              onReset={onSearchReset}
            />
            {ActionButton && <ActionButton />}
          </SearchWrapper>
        )}
        {children}
        {posts && posts.length ? (
          posts.map((post, idx) => (
            <MappingComponent
              post={post}
              search={search}
              key={post[idKey]}
              idx={idx}
            />
          ))
        ) : NoContentHandler ? (
          <NoContentHandler />
        ) : (
          <></>
        )}
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
      </ContentGetter>
    </Wrapper>
  );
};

const usePostsNavigator = ({
  withSearch,
  wrapperComponent,
  actionButton,
  link,
  searchLink,
  pageName,
  postsKey,
  sortClauses,
  maxWidth,
  noContentHandler,
  mappingComponent,
  handlerComponents,
  idKey,
  noErrorHandling,
  acceptEmptyData,
  noLoadingComponent,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortClause, setCurrentSortClause] = useState("newest");
  const [search, setSearch] = useState("");
  const [postsData, setPostsData] = useState({});

  const { data, loading, error, ContentGetter } = useContentGetter({
    pageName,
    link: `${
      search ? `${searchLink}/${search}` : link
    }/${sortClause}/${currentPage}`,
    handlerComponents,
    noErrorHandling,
    noLoadingComponent,
  });

  useEffect(() => {
    if (error && error.response) setPostsData(error.response.data);
    else acceptEmptyData ? setPostsData(data) : data && setPostsData(data);
  }, [data, error, setPostsData, acceptEmptyData]);

  return {
    postsNavigator: PostsNavigatorComponent,
    data,
    postsData,
    setPostsData,
    loading,
    error,
    sortClause,
    postsNavigatorProps: {
      wrapperComponent,
      withSearch,
      actionButton,
      postsKey,
      sortClauses,
      maxWidth,
      noContentHandler,
      mappingComponent,
      data: postsData,
      loading,
      contentGetter: ContentGetter,
      currentPage,
      setCurrentPage,
      sortClause,
      setCurrentSortClause,
      search,
      setSearch,
      idKey,
    },
  };
};

export default usePostsNavigator;
