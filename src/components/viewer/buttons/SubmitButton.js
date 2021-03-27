import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubmitIcon from "./SubmitIcon";

const Submit = styled.button`
  align-items: center;
  background: rgba(61, 65, 72, 1);
  border: 1px solid rgba(60, 60, 67, 0.3);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  display: flex;
  font-size: 18px;
  height: 32px;
  justify-content: center;
  margin: auto;
  outline: 0;
  &:hover {
    background-color: rgba(48, 209, 88, 0.6);
    color: rgba(255, 255, 255, 1);
  }
  &:active {
    background-color: rgba(48, 209, 88, 1);
    color: rgba(255, 255, 255, 1);
  }
  &:disabled {
    background-color: rgba(58, 58, 60, 0.6);
    color: rgba(255, 255, 255, 0.33);
    cursor: auto;
  }
`;

const SubmitButton = ({ disabled, handleClick }) => (
  <Submit onClick={handleClick} disabled={disabled}>
    <SubmitIcon />
  </Submit>
);

export default SubmitButton;

SubmitButton.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};
