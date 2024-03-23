import ErrorBox from "../components/common/errorBox";
import Spinner from "../components/common/spinner";
import useAxios from "axios-hooks";
import SecondaryCardDiv from "../components/styles/common/secondaryCardDiv";

const ContentGetterComponent = ({
  error,
  refetch,
  data,
  loading,
  pageName,
  noLoadingComponent,
  handlerComponents,
  ErrorComponent,
  SpinnerWrapper,
  children,
}) => {
  if (error) {
    if (
      handlerComponents &&
      Object.keys(handlerComponents).includes(String(error.response.status))
    ) {
      const HandlerComponent = handlerComponents[error.response.status];
      return <HandlerComponent refetch={refetch} pageName={pageName} />;
    }
    return ErrorComponent ? (
      <ErrorComponent refetch={refetch} failedAt={pageName} />
    ) : (
      <SecondaryCardDiv>
        <ErrorBox refetch={refetch} failedAt={pageName} />
      </SecondaryCardDiv>
    );
  } else if (loading) {
    if (noLoadingComponent) return;
    if (data) {
      return (
        <>
          {children}
          {SpinnerWrapper ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <Spinner />
          )}
        </>
      );
    }
    return SpinnerWrapper ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <Spinner />
    );
  }
  return <>{children}</>;
};

const useContentGetter = ({
  errorComponent: ErrorComponent,
  spinnerWrapper: SpinnerWrapper,
  pageName,
  link,
  noLoadingComponent,
  handlerComponents,
}) => {
  const [{ data, loading, error }, refetch] = useAxios(link);

  const ContentGetter = ({ children }) => (
    <ContentGetterComponent
      errorComponent={ErrorComponent}
      spinnerWrapper={SpinnerWrapper}
      pageName={pageName}
      noLoadingComponent={noLoadingComponent}
      handlerComponents={handlerComponents}
      error={error}
      data={data}
      loading={loading}
      refetch={refetch}
    >
      {children}
    </ContentGetterComponent>
  );

  return {
    data,
    loading,
    error,
    refetch,
    ContentGetter,
  };
};

export default useContentGetter;
