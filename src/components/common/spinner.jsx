import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSpinner = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
`;

const SpinnerBox = styled.div`
  text-align: center;
`;

const Spinner = () => {
  return (
    <SpinnerBox>
      <StyledSpinner icon={faSyncAlt} className="fa-spin" />
    </SpinnerBox>
  );
};

export default Spinner;
