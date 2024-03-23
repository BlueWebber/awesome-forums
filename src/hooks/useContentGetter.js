import ErrorBox from "../components/common/errorBox";
import Spinner from "../components/common/spinner";
import useAxios from "axios-hooks";
import SecondaryCardDiv from "../components/styles/common/secondaryCardDiv";
import { useMemo } from "react";

const ContentGetterComponent = ({
  error,
  refetch,
  data,
  loading,
  pageName,
  noLoadingComponent,
  handlerComponents,
  noErrorHandling,
  errorComponent: ErrorComponent,
  spinnerWrapper: SpinnerWrapper,
  children,
}) => {
  if (error) {
    if (noErrorHandling) {
      return <>{children}</>;
    }
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
    if (noLoadingComponent) return children;
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
  errorComponent,
  spinnerWrapper,
  pageName,
  link,
  noLoadingComponent,
  handlerComponents,
  noErrorHandling,
}) => {
  const [{ data, loading, error }, refetch] = useAxios(link);

  const ContentGetter = useMemo(
    () =>
      ({ children }) =>
        (
          <ContentGetterComponent
            errorComponent={errorComponent}
            spinnerWrapper={spinnerWrapper}
            pageName={pageName}
            noLoadingComponent={noLoadingComponent}
            handlerComponents={handlerComponents}
            error={error}
            data={data}
            loading={loading}
            refetch={refetch}
            noErrorHandling={noErrorHandling}
          >
            {children}
          </ContentGetterComponent>
        ),
    [
      errorComponent,
      spinnerWrapper,
      noLoadingComponent,
      error,
      handlerComponents,
      data,
      loading,
      refetch,
      pageName,
      noErrorHandling,
    ]
  );

  return {
    data,
    loading,
    error,
    refetch,
    ContentGetter: ContentGetter,
  };
};

export default useContentGetter;
