const ErrorBox = (props) => {
  return (
    <div>
      <h1>Sorry, an error has occured</h1>
      <button onClick={props.refetch}>Retry</button>
    </div>
  );
};

export default ErrorBox;
