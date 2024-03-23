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
  query,
  setQuery,
  data,
  loading,
  contentGetter: ContentGetter,
  idKey,
  mappingFunction,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const scrollRef = useRef();

  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setQuery({ ...query, currentPage: index }), 200);
  };

  const onSort = (key) => {
    setQuery({ ...query, sortClause: key });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput === query.search) return;
    setQuery({ ...query, currentPage: 0, search: searchInput });
  };

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchReset = () => {
    setSearchInput("");
    if (query.search) {
      setQuery({ ...query, search: "" });
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
              currentClause={query.sortClause}
            />
          ) : null}
        </div>
        {withSearch && (data || query.search) && (
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
          mappingFunction ? (
            mappingFunction(posts)
          ) : (
            posts.map((post, idx) => (
              <MappingComponent
                post={post}
                search={query.search}
                key={post[idKey]}
                idx={idx}
              />
            ))
          )
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
              currentPage={query.currentPage}
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
  mappingFunction,
}) => {
  const [query, setQuery] = useState({
    currentPage: 0,
    sortClause: "newest",
    search: "",
  });
  const [postsData, setPostsData] = useState({});

  const { data, loading, error, ContentGetter } = useContentGetter({
    pageName,
    link: `${query.search ? `${searchLink}/${query.search}` : link}/${
      query.sortClause
    }/${query.currentPage}`,
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
    sortClause: query.sortClause,
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
      query,
      setQuery,
      idKey,
      mappingFunction,
    },
  };
};

export default usePostsNavigator;
