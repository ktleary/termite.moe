import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Cell } from "./grid";

const StoryItemCell = styled(Cell)`
  background-color: rgba(61, 65, 72, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  padding: 4px;
  margin: 4px;
`;

const StoryItem = ({ item }) => <StoryItemCell>{item}</StoryItemCell>;

export default StoryItem;

StoryItem.propTypes = {
  item: PropTypes.any,
  title: PropTypes.string,
};
