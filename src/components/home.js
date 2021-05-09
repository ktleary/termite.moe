import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  background-image: url(/woodpile.jpg);
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;
const HomeHeader = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0;
  padding: 16px 16px;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  font-size: 21px;
`;
const HomeMain = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
  justify-content: center;
`;

const HomeContent = styled.div`
  background-color: #fff;
  color: #000;
  flex-direction: row;
  flex: 5;
  font-size: 1.33em;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 20vw;
  font-weight: normal;
  margin: 0 0 0 16px;
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

const Home = ({ isLoggedIn }) => (
  <>
    <HomeContainer>
      <HomeHeader>
        {isLoggedIn ? (
          <NavLink to="/viewer">App</NavLink>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </HomeHeader>
      <HomeMain>
        <Title>TERMITE</Title>
        <Subtitle>BREAK DOWN CONTENT IN THE BLINK OF AN EYE</Subtitle>
      </HomeMain>
    </HomeContainer>
    <HomeContent>
      Termite Viewer uses Natural Language Processing (NLP) to extract and analyze
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
  </>
);

export default Home;

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
};
