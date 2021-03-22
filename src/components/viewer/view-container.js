/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gt, indexOf, prop, toString } from "ramda";
import { Cell, Row } from "./grid";
import StoryItem from "./story-item";
import { fetchStory } from "../../http";
import { validateUrl } from "../../util";
import { lenGt0, lenKeysGt0, rmNonAlpha } from "./helpers";
import ContentItem from './content-item';
import SearchBox from "./search-box";
import StoryItemCategory from "./story-item-category";
import StoryText from "./story-text";
import Title from './title';
import { StoryItemTitle } from "./story-style";

const ViewWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
`;

const Panel = styled.div`
  background-color: rgba(40, 44, 52, 0.33);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin: auto;
  min-height: 100vw;
  padding: 8px;
  width: 78%;
`;



const MessageWrapper = styled(Cell)`
  align-self: center;
  color: rgba(187, 134, 252, 1);
  height: 32px;
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

const SentimentScoreDisplay = styled.div`
  color: ${({ score }) =>
    score >= 0 ? "rgba(2, 218, 197, 0.87)" : "rgba(255, 65, 129, 0.87)"};
  font-size: 100%;
`;

const SentimentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const ContentContainer = styled.div`
  margin-top: 4px;
`;

const sentimentScore = sentiments => prop("score", sentiments);

const SentimentScore = ({ score }) => {
  return (
    <SentimentWrapper>
      <Cell>sentiment score: </Cell>
      <SentimentScoreDisplay score={score}>{score}</SentimentScoreDisplay>
    </SentimentWrapper>
  );
};

const ImageItem = ({ url }) => {
  const imageExts = ["jpg", "png", "gif"];
  const isImage = imageExts.reduce(
    (b, ext) => (!b && url && url.indexOf(ext) > -1 ? true : b),
    false
  );
  return isImage ? <img src={url} style={{ height: 48 }} /> : url;
};

const qualifyImageUrl = url =>
  gt(indexOf("http", url), -1) ? url : "https://".concat(url);

const isImage = xs => {
  // eslint-disable-next-line fp/no-let
  let flag = false;
  ["gif", "jpg", "jpeg", "png"].forEach(ext => {
    // eslint-disable-next-line fp/no-mutation
    if (xs.indexOf(ext) > -1) flag = true;
  });
  return flag;
};

const SiteName = ({ name }) => (lenGt0(name) ? <Cell>{name}</Cell> : null);




// -- Main -------
const ViewContainer = ({ token, isLoggedIn }) => {
  // -- State ------
  const [content, setContent] = useState();
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");

  const urlValid = useMemo(() => validateUrl(url));
  const contentAvailable = useMemo(() => lenKeysGt0(content));

  const handleChange = e => setUrl(e.target.value);
  const handleClose = () => setUrl("");
  const handleSubmit = async () => {
    setMsg("fetching results ... ");
    const storyContent = await fetchStory(url);
    return setContent(storyContent, setMsg(""));
  };

  return !isLoggedIn ? (
    <div>{JSON.stringify({ token, isLoggedIn })} not logged in</div>
  ) : (
    <ViewWrapper>
      <Panel>
        <SearchBox
          handleChange={handleChange}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          urlValid={urlValid}
          contentAvailable={contentAvailable}
          url={url}
          data-testid="quick-input"
        />
        {msg.length ? (
          <Row>
            <MessageWrapper>{msg}</MessageWrapper>
          </Row>
        ) : null}

        {contentAvailable && (
          <ContentContainer>
            <Row>
              <SiteName name={prop("siteName", content)} />
              <Title title={prop("title", content)} />
            </Row>
            <Row>
              <ContentItem itemContent={prop("byline", content)} /> wordcount{" "}
              <ContentItem itemContent={toString(prop("wordcount", content))} />
              <SentimentScore
                score={sentimentScore(prop("sentiments", content))}
              />
            </Row>
            <Row>
              <ContentItem itemContent={prop("excerpt", content)} />
            </Row>

            <StoryItemCategory title={"What"} content={prop("what", content)} />

            <StoryItemCategory title={"Who"} content={prop("who", content)} />

            <StoryItemCategory
              title={"Where: "}
              content={prop("where", content)}
            />

            <StoryItemCategory title={"When"} content={prop("when", content)} />

            <StoryItemCategory
              title={"In Quotes"}
              content={prop("quotes", content)}
            />

            <Row>
              <StoryItemTitle>Numbers: </StoryItemTitle>
              {content &&
                content.numbers &&
                content.numbers
                  .map(i => i.text.toString())
                  .map(rmNonAlpha)
                  .map((n, i) => <StoryItem key={`numbers-${i}}`} item={n} />)}
            </Row>
            <Row>
              {content &&
                content.urls &&
                content.urls.map(qualifyImageUrl).map((url, i) =>
                  isImage(url) ? (
                    <Cell key={`img-${i}`}>
                      <img src={url} height="200px" />
                    </Cell>
                  ) : (
                    <Cell key={`img-${i}`}>{url}</Cell>
                  )
                )}
            </Row>
            <Row>
              <StoryItemTitle>Mentions: </StoryItemTitle>
              {content &&
                content.mentions &&
                content.mentions.map((n, i) => (
                  <StoryItem key={`numbers-${i}}`} item={n} />
                ))}
            </Row>
            {content && content.sentences ? (
              <StoryText text={content.sentences} />
            ) : null}
          </ContentContainer>
        )}
      </Panel>
    </ViewWrapper>
  );
};

export default ViewContainer;

// eslint-disable-next-line fp/no-mutation
ViewContainer.propTypes = {
  setToken: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.any,
};

// eslint-disable-next-line fp/no-mutation
ImageItem.propTypes = {
  url: PropTypes.string,
};

// eslint-disable-next-line fp/no-mutation
SentimentScore.propTypes = {
  score: PropTypes.number,
};

// eslint-disable-next-line fp/no-mutation
SiteName.propTypes = {
  name: PropTypes.string,
};

