import styled from "styled-components";

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: ${(props) => (props["center-text"] ? "center" : null)};
  flex-grow: 1;
  margin: 30px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 13px 1px
    ${({ theme, disabled }) => (disabled ? "null" : theme.colors.shadowColor)};
  max-width: ${(props) => (props["max-width"] ? props["max-width"] : null)};
  max-height: ${(props) => (props["max-height"] ? props["max-height"] : null)};
  flex-direction: ${(props) =>
    props["flex-direction"] ? props["flex-direction"] : null};
  background-color: ${(props) =>
    props["invisible"] ? "inherit" : props.theme.colors.dark};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};

  @media only screen and (max-width: 600px) {
    margin: 0;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
  }
`;

export default CardDiv;
