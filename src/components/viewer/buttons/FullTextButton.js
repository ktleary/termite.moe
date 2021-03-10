import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const FullText = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid rgba(60, 60, 67, 0.3);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  display: flex;
  font-size: 18px;
  height: 20px;
  justify-content: center;
  margin: auto;
  outline: 0;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  &:active {
    color: rgba(255, 255, 255, 1);
  }
  &:disabled {
    color: rgba(255, 255, 255, 0.33);
    cursor: auto;
  }
`;

const FullTextButton = ({ disabled, handleClick }) => (
  <FullText onClick={handleClick} disabled={disabled}>
    Toggle Full Text
  </FullText>
);

export default FullTextButton;
// eslint-disable-next-line fp/no-mutation
FullTextButton.propTypes = {
  handleClick: PropTypes.bool,
  disabled: PropTypes.bool,
};
