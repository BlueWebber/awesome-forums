const ErrorBox = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sorry, an error has occured</h1>
      <button onClick={props.refetch} className="btn btn-primary m-2">
        Retry
      </button>
    </div>
  );
};

export default ErrorBox;
