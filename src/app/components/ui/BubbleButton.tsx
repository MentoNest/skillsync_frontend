"use client";

import React from "react";
import styled, { css } from "styled-components";

interface BubbleButtonProps {
  children: React.ReactNode;
  primary?: boolean;
}

interface StyledWrapperProps {
  $primary?: boolean;
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ children, primary }) => {
  return (
    <StyledWrapper $primary={primary}>
      <button>{children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<StyledWrapperProps>`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    width: 180px; /* Adjusted width for longer text */
    height: 50px;
    border-radius: 30px;
    transition: all 0.2s ease;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-shadow: 0 1px #fff;

    ${({ $primary }) =>
      $primary
        ? css`
            background-color: #8b5cf6; /* Purple */
            color: white;
            border: 1px solid #8b5cf6;
            &:hover {
              background-color: #7c3aed;
            }
          `
        : css`
            background-color: white;
            border: 1px solid #8b5cf6; /* Purple border */
            color: #8b5cf6; /* Purple text */
            text-shadow: none;

            &:hover {
              background-color: #f5f3ff; /* Light purple background on hover */
            }
          `}
  }
`;

export default BubbleButton;
