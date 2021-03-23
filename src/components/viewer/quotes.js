import React from "react";
import { array } from "prop-types";
import StoryItemCategory from "./story-item-category";

const Quotes = ({ quotes }) => (
  <StoryItemCategory title={"In Quotes"} content={quotes} />
);

export default Quotes;

// eslint-disable-next-line fp/no-mutation
Quotes.propTypes = {
  quotes: array,
};
