import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Cell } from "./grid";

const SentimentScoreDisplay = styled.div`
  color: ${({ score }) =>
    score >= 0 ? "rgba(2, 218, 197, 0.87)" : "rgba(255, 65, 129, 0.87)"};
  font-size: 100%;
`;

const SentimentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const SentimentScore = ({ score }) => {
  return (
    <SentimentWrapper>
      <Cell>sentiment score: </Cell>
      <SentimentScoreDisplay score={score}>{score}</SentimentScoreDisplay>
    </SentimentWrapper>
  );
};

export default SentimentScore;

// eslint-disable-next-line fp/no-mutation
SentimentScore.propTypes = {
  score: PropTypes.number,
};
