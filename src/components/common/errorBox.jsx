import styled from "styled-components";

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const ErrorBox = (props) => {
  return (
    <ErrorDiv>
      <h2>Sorry, an error has occured while loading this page</h2>
      <button onClick={props.refetch}>Retry</button>
    </ErrorDiv>
  );
};

export default ErrorBox;
