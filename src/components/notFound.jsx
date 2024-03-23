import React from "react";
import styled from "styled-components";

const NotFoundDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const NotFound = () => {
  return (
    <NotFoundDiv>
      <h1>404</h1>
      <label>Requested page was not found</label>
    </NotFoundDiv>
  );
};

export default NotFound;
