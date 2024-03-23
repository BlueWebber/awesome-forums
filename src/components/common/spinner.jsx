import styled from "styled-components";
import Loader from "react-loader-spinner";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

const SpinnerBox = styled.div`
  text-align: center;
  justify-self: center;
  align-self: center;
  place-self: center;
  /* position: ${({ position }) => (position ? position : "absolute")}; */
  background-color: rgba(0, 0, 255, 0);
  /* margin: 2rem; */
  margin: auto auto;
`;

const Spinner = ({ position }) => {
  const theme = useContext(ThemeContext);
  return (
    <SpinnerBox position={position}>
      <Loader
        type="TailSpin"
        height="2rem"
        width="2rem"
        timeout={5000}
        color={theme.colors.primaryText}
      />
    </SpinnerBox>
  );
};

export default Spinner;
