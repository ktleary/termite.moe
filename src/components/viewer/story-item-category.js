import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NoContent from './no-content';
import { Row } from "./grid";
import StoryItem from './story-item';
import { StoryItemTitle } from "./story-style";
import { equals } from "ramda";
import { lenGt0, normalizeItems } from "./helpers";

const CategoryRow = styled(Row)`
  border-bottom: 1px solid rgba(62, 65, 72, 0.5);
  padding-bottom: 8px;
  width: 100%;
`;

const processItem = (title, item) =>
  equals(title, "In Quotes") ? `"${item}"` : item;

const StoryItemCategory = ({ title, content }) => (
  <CategoryRow>
    <StoryItemTitle>{title}</StoryItemTitle>
    {lenGt0(content) ? (
      normalizeItems(content).map((item, i) => (
        <StoryItem
          key={`storyitem-${title}-${i}`}
          item={processItem(title, item)}
        />
      ))
    ) : (
      <NoContent />
    )}
  </CategoryRow>
);

export default StoryItemCategory;

StoryItemCategory.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
