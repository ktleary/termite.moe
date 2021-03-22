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
  // eslint-disable-next-line fp/no-nil
  lenGt0(title) ? <StoryTitle>{title}</StoryTitle> : null;

export default Title;

// eslint-disable-next-line fp/no-mutation
Title.propTypes = {
  title: PropTypes.string,
};
