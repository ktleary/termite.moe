import React, { useMemo, useState } from "react";
import styled from "styled-components";
import FullTextButton from "./buttons/FullTextButton";
import { equals, not, replace } from "ramda";
import { lenGt0 } from "./helpers";

const TextContainer = styled.div``;

const SentencesContainer = styled.div`
  background: rgba(61, 65, 72, 1);
  border: 1px solid rgba(72, 72, 74, 0.6);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.89);
  font-size: 16px;
  max-height: 300px;
  margin: 16px auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
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



const removeHttp = xs => replace(/http.*?\s/g, " ", xs);

const StoryText = sentences => {
  const { text } = sentences;
  const [fullText, setFullText] = useState(true);
  const noText = useMemo(() => not(lenGt0(text)));
  const handleClick = () => setFullText(not(fullText));
  return (
    <TextContainer>
      <FullTextButton disabled={noText} handleClick={handleClick} />
      {equals(fullText, true) ? (
        <SentencesContainer>
          {text.map((sentence, i) => (
            <Sentence key={`sentence-${i}`}>{removeHttp(sentence)}</Sentence>
          ))}
        </SentencesContainer>
      ) : null}
    </TextContainer>
  );
};

export default StoryText;
