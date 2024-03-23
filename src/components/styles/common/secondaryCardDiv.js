import styled from "styled-components";

const SecondaryCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.main};
  padding: 1rem;
  margin-bottom: 2px;
`;

export default SecondaryCardDiv;
