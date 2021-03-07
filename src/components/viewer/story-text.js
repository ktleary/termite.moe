import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  background: rgba(0, 0, 0, 1);
  color: rgba(255, 255, 255, 0.66);
  font-size: 13px;
  max-height: 250px;
  margin: 16px auto;
  overflow-y: auto;
  padding: 8px;

  width: 50%;
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
