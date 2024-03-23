import React from "react";
import styled from "styled-components";

const NotFoundDiv = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const NotFound = () => {
  return (
    <NotFoundDiv>
      <h1>403</h1>
      <label>You are not authorized to access this page</label>
    </NotFoundDiv>
  );
};

export default NotFound;
