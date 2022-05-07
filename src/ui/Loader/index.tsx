import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from 'styles/colors';

const rotate = keyframes`
  0% { transform: rotate(0deg); }

  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoader = styled.div`
  width: 60px;
  height: 60px;
  border: 16px solid ${colors.white};
  border-top: 16px solid ${colors.primary};
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
`;

const Loader = () => (
  <LoaderContainer>
    <StyledLoader />
  </LoaderContainer>
);

export { Loader };
