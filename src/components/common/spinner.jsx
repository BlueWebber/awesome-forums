import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSpinner = styled(FontAwesomeIcon).attrs({
  icon: faSyncAlt,
  className: "fa-spin",
})`
  font-size: 2rem;
`;

const SpinnerBox = styled.div`
  text-align: center;
  justify-self: center;
  align-self: center;
  position: absolute;
  background-color: rgba(0, 0, 255, 0);
`;

const Spinner = () => {
  return (
    <SpinnerBox>
      <StyledSpinner />
    </SpinnerBox>
  );
};

export default Spinner;
