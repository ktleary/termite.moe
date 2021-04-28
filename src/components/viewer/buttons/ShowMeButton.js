import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ShowMe = styled.button`
  background-color: rgba(48, 209, 88, 0.76);
  border: 1px solid rgba(60, 60, 67, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  font-size: 18px;
  height: 48px;
  margin: 32px;
  outline: 0;
  padding: 8px;
  width: 128px;
  &:hover {
    background-color: rgba(48, 209, 88, 1);
    color: rgba(255, 255, 255, 1);
  }
  &:active {
    background-color: rgba(48, 209, 88, 1);
    color: rgba(255, 255, 255, 1);
  }
`;

const ShowMeButton = ({ handleClick }) => (
  <ShowMe onClick={handleClick}>SHOW ME</ShowMe>
);

export default ShowMeButton;

ShowMeButton.propTypes = {
  handleClick: PropTypes.func,
};
