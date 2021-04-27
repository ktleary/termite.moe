import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.33);
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const HomeHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const HomeMain = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
  justify-content: center;
`;

const HomeContent = styled.div`
  flex-direction: row;
  flex: 5;
`;

const Title = styled.h1`
  font-size: 170px;
  font-family: Roboto, sans-serif;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Subtitle = styled.h3`
  color: rgba(255, 255, 255, 0.66);
  font-family: Source Code Pro, sans-serif;
  font-size: 24px;
  margin: 0;
  margin-left: 32px;
  padding: 0;
`;

const Home = () => (
  <HomeContainer>
    <HomeHeader>Sign In</HomeHeader>
    <HomeMain>
      <Title>Termite</Title>
      <Subtitle>BREAK DOWN WEB POSTS IN A FLASH</Subtitle>
    </HomeMain>
    <HomeContent>
      Termite uses Natural Language Processing (NLP) to extract and analyze
      content from user-supplied URLs. Content is broken down into:
      <ul>
        <li>Word Count</li>
        <li>Sentiment Score</li>
        <li>Quotations</li>
        <li>Social Media Handles</li>
        <li>Content Metadata</li>
        <li>Raw Text</li>
        <li>Images</li>
        <li>Urls</li>
      </ul>
    </HomeContent>
  </HomeContainer>
);

export default Home;
