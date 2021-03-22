import React from "react";
import PropTypes from "prop-types";
import { lenGt0 } from "./helpers";
import { Cell } from "./grid";

const ContentItem = ({ itemContent }) =>
  // eslint-disable-next-line fp/no-nil
  lenGt0(itemContent) ? <Cell>{itemContent}</Cell> : null;

export default ContentItem;

// eslint-disable-next-line fp/no-mutation
ContentItem.propTypes = {
  itemContent: PropTypes.string,
};
