import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSpinner = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 5rem;
`;

const Spinner = () => {
  return <StyledSpinner icon={faSpinner} className="fa-spin" />;
};

export default Spinner;
