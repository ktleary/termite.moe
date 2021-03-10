import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  background: rgba(10, 10, 11, 1);
  border: 1px solid rgba(72, 72, 74, 0.6);
  color: rgba(255, 255, 255, 0.89);
  font-size: 16px;
  max-height: 300px;
  margin: 16px auto;
  min-height: 88px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  width: 78%;
  &:hover {
    border: 1px solid rgba(72, 72, 74, 1);
  }
  &:focus {
    border: 1px solid rgba(10, 132, 255, 0.3);
    outline: 0;
  }

  &:active {
    border: 1px solid rgba(10, 132, 255, 0.3);
    outline: 0;
  }
`;

const Sentence = styled.div`
  margin: auto;
  padding: 4px;
`;

const StoryText = sentences => {
  const { text } = sentences;
  return (
    <TextContainer>
      {text.map((sentence, i) => (
        <Sentence key={`sentence-${i}`}>{sentence}</Sentence>
      ))}
    </TextContainer>
  );
};

export default StoryText;
