import React, { useMemo, useState } from "react";

import { ViewContainerProps } from "./types";
import styled from "styled-components";
import { not, prop, toString, uniq } from "ramda";

import { fetchStory } from "../../http";
import { validateUrl } from "../../util";
import { lenKeysGt0 } from "./helpers";

import ContentHeader from "./content-header";
import ContentSubHeader from "./content-subheader";
import Excerpt from "./excerpt";
import Mentions from "./mentions";
import Message from "./message";
import Numbers from "./numbers";
import Quotes from "./quotes";
import SearchBox from "./search-box";
import StoryText from "./story-text";
import Urls from "./urls";
import Vitals from "./vitals";

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

const ViewContainer = ({ token, isLoggedIn }) => {
  const [content, setContent] = useState();
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");

  const urlValid = useMemo(() => validateUrl(url));
  const contentAvailable = useMemo(() => lenKeysGt0(content));

  const handleChange = e => setUrl(prop("value", e.target));
  const handleClose = () => setUrl("");
  const handleSubmit = async () => {
    setMsg("Fetching results ... ");
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
            <StoryText text={content.sentences} />
            <Quotes quotes={prop("quotes", content)} />
            <Vitals content={content} />
            <Numbers numbers={prop("numbers", content)} />
            <Urls urls={uniq(prop("urls", content))} />
            <Mentions mentions={prop("mentions", content)} />
          </ContentContainer>
        )}
      </Panel>
    </ViewWrapper>
  );
};

export default ViewContainer;

ViewContainer.propTypes = ViewContainerProps;
