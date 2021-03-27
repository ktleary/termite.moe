import React from "react";
import { array } from "prop-types";
import { rmNonAlpha } from "./helpers";
import StoryItem from './story-item';
import { Row } from "./grid";
import { StoryItemTitle } from "./story-style";

const Numbers = ({ numbers }) => (
  <Row>
    <StoryItemTitle>Numbers: </StoryItemTitle>
    {numbers
      .map(i => i.text.toString())
      .map(rmNonAlpha)
      .map((n, i) => (
        <StoryItem key={`numbers-${i}}`} item={n} />
      ))}
  </Row>
);

export default Numbers;

Numbers.propTypes = {
  numbers: array,
};
