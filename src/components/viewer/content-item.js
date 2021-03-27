import React from "react";
import PropTypes from "prop-types";
import { lenGt0 } from "./helpers";
import { Cell } from "./grid";

const ContentItem = ({ itemContent }) =>
  lenGt0(itemContent) ? <Cell>{itemContent}</Cell> : null;

export default ContentItem;

ContentItem.propTypes = {
  itemContent: PropTypes.string,
};
