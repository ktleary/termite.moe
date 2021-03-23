import React from "react";
import { number, string } from "prop-types";
import { Row } from "./grid";
import ContentItem from "./content-item";
import SentimentScore from "./sentiment-score";

const ContentSubHeader = ({ byline, score, wordcount }) => (
  <Row>
    <ContentItem itemContent={byline} /> wordcount{" "}
    <ContentItem itemContent={wordcount} />
    <SentimentScore score={score} />
  </Row>
);

export default ContentSubHeader;

// eslint-disable-next-line fp/no-mutation
ContentSubHeader.propTypes = {
  byline: string,
  score: number,
  wordcount: string,
};
