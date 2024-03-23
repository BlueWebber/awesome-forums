import styled from "styled-components";

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: ${(props) => (props["center-text"] ? "center" : null)};
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.dark};
  margin: 30px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 13px 1px ${({ theme }) => theme.colors.shadowColor};
  max-width: ${(props) => (props["max-width"] ? props["max-width"] : null)};
  max-height: ${(props) => (props["max-height"] ? props["max-height"] : null)};
  flex-direction: ${(props) =>
    props["flex-direction"] ? props["flex-direction"] : null};
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};

  @media only screen and (max-width: 600px) {
    margin: 0;
    margin-top: 10px;
    padding: 10px;
  }
`;

export default CardDiv;
