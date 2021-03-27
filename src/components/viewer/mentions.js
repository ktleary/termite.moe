import React from "react";
import { array } from "prop-types";
import { length } from "ramda";
import StoryItem from "./story-item";
import { StoryItemTitle } from "./story-style";
import { Row } from "./grid";

const Mentions = ({ mentions }) =>
  length(mentions) ? (
    <Row>
      {JSON.stringify(mentions)}
      <StoryItemTitle>Mentions: </StoryItemTitle>
      {mentions.map((n, i) => (
        <StoryItem key={`numbers-${i}}`} item={n} />
      ))}
    </Row>
  ) :
  null;

export default Mentions;


Mentions.propTypes = {
  mentions: array,
};
