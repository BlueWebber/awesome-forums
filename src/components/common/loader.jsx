import Spinner from "./spinner";
import ErrorBox from "./errorBox";

const Loader = ({ data, loading, error, refetch, finishedCallback }) => {
  // return props.error ? <ErrorBox refetch={props.refetch} /> : <Spinner />;
  if (!loading && error) return <ErrorBox refetch={refetch} />;
  if (loading) return <Spinner />;
  if (data) return finishedCallback(data);
};

export default Loader;
