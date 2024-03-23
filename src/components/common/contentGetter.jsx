import ErrorBox from "./errorBox";
import Spinner from "./spinner";
import useAxios from "axios-hooks";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";

const ContentGetter = ({
  errorComponent: ErrorComponent,
  spinnerWrapper: SpinnerWrapper,
  pageName,
  renderFunc,
  link,
  wrapper,
  noLoadingComponent,
}) => {
  const [{ data, loading, error }, refetch] = useAxios(link);

  const getContent = () => {
    if (error) {
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
            {renderFunc(data)}
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
    } else {
      return renderFunc(data);
    }
  };
  return wrapper ? wrapper(getContent(), loading) : getContent();
};

export default ContentGetter;
