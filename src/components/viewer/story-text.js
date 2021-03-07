import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  background: rgba(41, 41, 42, 1);
  color: rgba(255, 255, 255, 0.89);
  font-size: 16px;
  max-height: 300px;

  margin: 16px auto;
  min-height: 88px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  width: 78%;
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
