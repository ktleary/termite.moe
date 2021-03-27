import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "./Icon";

const Svg = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const SubmitIcon = ({ className }) => (
  <Svg title="Submit" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </Svg>
);

export default SubmitIcon;

SubmitIcon.propTypes = {
  className: PropTypes.string,
};
