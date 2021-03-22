import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  compose,
  gt,
  indexOf,
  or,
  toLower,
  prop,
  reduce,
  toString,
} from "ramda";
import { IMAGEEXTS } from "../../constants";
import { Cell, Row } from "./grid";
import StoryItem from "./story-item";
import { fetchStory } from "../../http";
import { validateUrl } from "../../util";
import { gte0, lenKeysGt0, rmNonAlpha } from "./helpers";
import ContentItem from "./content-item";
import SearchBox from "./search-box";
import SentimentScore from "./sentiment-score";
import SiteName from "./site-name";
import StoryItemCategory from "./story-item-category";
import StoryText from "./story-text";
import Title from "./title";
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

const ContentContainer = styled.div`
  margin-top: 4px;
`;

const getScore = xo => prop("score", xo);

const getSentimentScore = content => getScore(prop("sentiments", content));

const qualifyImageUrl = url =>
  gt(indexOf("http", url), -1) ? url : "https://".concat(url);

const idxOfX = (x, ext) => indexOf(ext, x);
const idxOfXGte0 = compose(gte0, idxOfX);
const checkMatch = (xs, target) => idxOfXGte0(toLower(xs), target);

const isImage = xs =>
  reduce((result, ext) => or(result, checkMatch(xs, ext)), false, IMAGEEXTS);

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
    // eslint-disable-next-line fp/no-unused-expression
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
        ) : // eslint-disable-next-line fp/no-nil
        null}

        {contentAvailable && (
          <ContentContainer>
            <Row>
              <SiteName name={prop("siteName", content)} />
              <Title title={prop("title", content)} />
            </Row>
            <Row>
              <ContentItem itemContent={prop("byline", content)} /> wordcount{" "}
              <ContentItem itemContent={toString(prop("wordcount", content))} />
              <SentimentScore score={getSentimentScore(content)} />
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
            ) : // eslint-disable-next-line fp/no-nil
            null}
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
