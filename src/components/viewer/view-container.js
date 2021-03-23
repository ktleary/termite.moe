import React, { useMemo, useState } from "react";

import { ViewContainerProps } from "./types";
import styled from "styled-components";
import { gt, indexOf, not, or, prop, reduce, toString } from "ramda";
import { IMAGEEXTS } from "../../constants";
import { fetchStory } from "../../http";
import { validateUrl } from "../../util";
import { checkMatch, lenKeysGt0, rmNonAlpha } from "./helpers";

import ContentHeader from "./content-header";
import ContentSubHeader from "./content-subheader";
import Excerpt from "./excerpt";
import Message from "./message";
import Quotes from "./quotes";
import SearchBox from "./search-box";
import StoryItem from "./story-item";
import StoryText from "./story-text";
import Vitals from "./vitals";
import { Cell, Row } from "./grid";
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

const ContentContainer = styled.div`
  margin-top: 4px;
`;

const getScore = xo => prop("score", xo);

const getSentimentScore = content => getScore(prop("sentiments", content));

const qualifyImageUrl = url =>
  gt(indexOf("http", url), -1) ? url : "https://".concat(url);

const isImage = xs =>
  reduce((result, ext) => or(result, checkMatch(xs, ext)), false, IMAGEEXTS);

const ViewContainer = ({ token, isLoggedIn }) => {
  const [content, setContent] = useState();
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");

  const urlValid = useMemo(() => validateUrl(url));
  const contentAvailable = useMemo(() => lenKeysGt0(content));

  const handleChange = e => setUrl(prop("value", e.target));
  const handleClose = () => setUrl("");
  const handleSubmit = async () => {
    // eslint-disable-next-line fp/no-unused-expression
    setMsg("fetching results ... ");
    const storyContent = await fetchStory(url);
    return setContent(storyContent, setMsg(""));
  };

  return not(isLoggedIn) ? (
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
        <Message message={msg} />

        {contentAvailable && (
          <ContentContainer>
            <ContentHeader
              siteName={prop("siteName", content)}
              title={prop("title", content)}
            />
            <ContentSubHeader
              score={getSentimentScore(content)}
              byline={prop("byline", content)}
              wordcount={toString(prop("wordcount", content))}
            />
            <Excerpt excerpt={prop("excerpt", content)} />
            <Vitals content={content} />
            <Quotes quotes={prop("quotes", content)} />

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
ViewContainer.propTypes = ViewContainerProps;
