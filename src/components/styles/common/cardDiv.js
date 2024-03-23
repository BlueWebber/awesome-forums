import styled from "styled-components";

const CardDiv = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.dark};
  margin: 30px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 1px ${({ theme }) => theme.colors.shadowColor};
`;

export default CardDiv;
