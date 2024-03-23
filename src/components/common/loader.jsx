import Spinner from "./spinner";
import ErrorBox from "./errorBox";

const Loader = (props) => {
  return props.error ? <ErrorBox refetch={props.refetch} /> : <Spinner />;
};

export default Loader;
