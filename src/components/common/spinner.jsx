import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className="fa-spin"
      style={{ color: "white", fontSize: 40 }}
    />
  );
};

export default Spinner;
