import Spinner from "../components/common/spinner";
import ErrorBox from "../components/common/errorBox";
import useAxios from "axios-hooks";

const useLoader = ({ link, onLoaded }) => {
  const [status, refetch] = useAxios(link);
  if (!status.loading && status.error)
    return [status, <ErrorBox refetch={refetch} />];
  if (status.loading) return [status, <Spinner />];
  if (status.data) return [status, onLoaded(status.data)];
};

export default useLoader;
