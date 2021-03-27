import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Cell } from "./grid";

import { lenGt0 } from "./helpers";

const StoryTitle = styled(Cell)`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;

const Title = ({ title }) =>
  lenGt0(title) ? <StoryTitle>{title}</StoryTitle> : null;

export default Title;

Title.propTypes = {
  title: PropTypes.string,
};
