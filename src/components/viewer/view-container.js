/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { length } from "ramda";
import { fetchStory } from "../../http";
import { validateUrl } from "../../util";
import { lenGt0, lenKeysGt0, normalizeItems, rmNonAlpha } from "./helpers";
import SearchBox from "./search-box";
import StoryText from "./story-text";

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

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: 8px auto;
  width: 87%;
`;

const Cell = styled.div`
  padding: 8px;
  text-align: left;
`;

const NoContent = () => <Cell>Nothing found.</Cell>;

const StoryItemTitle = styled(Cell)`
  color: rgba(255, 255, 255, 1);
  min-width: 112;
  font-weight: 600;
  width: 100%;
`;

const StoryItemCell = styled(Cell)`
  background-color: rgba(27, 27, 28, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  padding: 4px;
  margin: 4px;
`;

const StoryTitle = styled(Cell)`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;

const MessageWrapper = styled(Cell)`
  align-self: center;
  color: rgba(187, 134, 252, 1);
  height: 32px;
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

const StoryItem = ({ item }) => <StoryItemCell>{item}</StoryItemCell>;

const SentimentScoreDisplay = styled.span`
  color: ${({ score }) =>
    score >= 0 ? "rgba(2, 218, 197, 0.87)" : "rgba(255, 65, 129, 0.87)"};
  font-size: 90%;
`;

const Span = styled.span``;

const SentimentScore = ({ score }) => {
  return (
    <Cell>
      <Span>sentiment score: </Span>
      <SentimentScoreDisplay score={score}>{score}</SentimentScoreDisplay>
    </Cell>
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

const isImage = xs => {
  // eslint-disable-next-line fp/no-let
  let flag = false;
  ["gif", "jpg", "jpeg", "png"].forEach(ext => {
    // eslint-disable-next-line fp/no-mutation
    if (xs.indexOf(ext) > -1) flag = true;
  });
  return flag;
};

const ViewContainer = ({ token, isLoggedIn }) => {
  const [content, setContent] = useState();
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");

  const urlValid = useMemo(() => validateUrl(url));
  const contentAvailable = useMemo(() => lenKeysGt0(content));

  console.log({ contentAvailable });

  const ContentContainer = styled.div`
    margin-top: 4px;
  `;

  const handleChange = e => setUrl(e.target.value);
  const handleClose = () => setUrl("");
  const handleSubmit = async () => {
    setMsg("fetching results ... ");
    const storyContent = await fetchStory(url);
    return setContent(storyContent, setMsg(""));
  };

  if (!isLoggedIn) {
    // eslint-disable-next-line fp/no-mutating-methods, fp/no-unused-expression
    return <div>{JSON.stringify({ token, isLoggedIn })} not logged in</div>;
  }

  if (!content)
    return (
      <ViewWrapper>
        <Panel>
          <SearchBox
            handleChange={handleChange}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            url={url}
            urlValid={urlValid}
            contentAvailable={contentAvailable}
            data-testid="quick-input"
          />
          <Row>
            <MessageWrapper>{msg}</MessageWrapper>
          </Row>
        </Panel>
      </ViewWrapper>
    );

  const { siteName, title } = content && content;

  return (
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
        {Object.keys(content).length && (
          <ContentContainer>
            <Row>
              {length(siteName) && <Cell>{siteName}</Cell>}
              {length(title) && <StoryTitle>{title}</StoryTitle>}
            </Row>
            <Row>
              <Cell>{content && content.byline} </Cell>
              <Cell>{content && `wordcount: ${content.wordcount}`}</Cell>
              {content && content.sentiments && (
                <SentimentScore score={content.sentiments.score} />
              )}
            </Row>
            <Row>
              <Cell>{content && content.excerpt}</Cell>
            </Row>
            {content && content.sentences ? (
              <StoryText text={content.sentences} />
            ) : null}
            <Row>
              <StoryItemTitle>What: </StoryItemTitle>
              {content &&
                content.what &&
                normalizeItems(content.what).map((item, i) => (
                  <StoryItem key={`storyitem-what-${i}`} item={item} />
                ))}
            </Row>
            <Row>
              <StoryItemTitle>Who: </StoryItemTitle>
              {content && lenGt0(content.who) ? (
                normalizeItems(content.who).map((item, i) => (
                  <StoryItem key={`storyitem-who-${i}`} item={item} />
                ))
              ) : (
                <NoContent />
              )}
            </Row>
            <Row>
              <StoryItemTitle>Where: </StoryItemTitle>
              {content && lenGt0(content.where) ? (
                normalizeItems(content.where).map((item, i) => (
                  <StoryItem key={`storyitem-where-${i}`} item={item} />
                ))
              ) : (
                <NoContent />
              )}
            </Row>
            <Row>
              <StoryItemTitle>When: </StoryItemTitle>
              {content &&
                content.when &&
                normalizeItems(content.when).map((item, i) => (
                  <StoryItem key={`storyitem-when-${i}`} item={item} />
                ))}
            </Row>
            <Row>
              <StoryItemTitle>In Quotes: </StoryItemTitle>
              {content &&
                content.quotes &&
                normalizeItems(content.quotes)
                  .map(item => `"${item}"`)
                  .map((item, i) => (
                    <StoryItem key={`storyitem-quote-${i}`} item={item} />
                  ))}
            </Row>

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
                content.urls.filter(isImage).map((url, i) => (
                  <Cell key={`img-${i}`}>
                    <img src={url} height="200px" />
                  </Cell>
                ))}
            </Row>
            <Row>
              <StoryItemTitle>Mentions: </StoryItemTitle>
              {content &&
                content.mentions &&
                content.mentions.map((n, i) => (
                  <StoryItem key={`numbers-${i}}`} item={n} />
                ))}
            </Row>
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
StoryItem.propTypes = {
  item: PropTypes.any,
  title: PropTypes.string,
};

// eslint-disable-next-line fp/no-mutation
ImageItem.propTypes = {
  url: PropTypes.string,
};

// eslint-disable-next-line fp/no-mutation
SentimentScore.propTypes = {
  score: PropTypes.number,
};
