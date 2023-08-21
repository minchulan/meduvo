import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const NotFoundText = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
          <NotFoundText>404 - Not Found~ </NotFoundText>
          <NotFoundText> ~ ¯\_(ツ)_/¯ </NotFoundText>
          
    </NotFoundContainer>
  );
};

export default NotFound;
