/* eslint-disable fp/no-nil */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import * as R from "ramda";
// import { useHistory } from "react-router-dom";
import Urlbar from "./urlbar";
import StoryText from "./story-text";
import { endpoint } from "../../env/configure-endpoint";

const ViewWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
`;

const Panel = styled.div`
  background-color: rgba(18, 18, 19, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  padding: 8px;
  width: 78%;
`;

async function fetchStory(url) {
  const endpointUrl = endpoint.concat("/story?");
  // eslint-disable-next-line fp/no-unused-expression
  console.log(endpointUrl);
  return fetch(
    endpointUrl +
      new URLSearchParams({
        url,
      })
  ).then(data => data.json());
}

const StoryItemWrapper = styled.div`
  padding: 16px;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 87%;
`;

const Cell = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  text-align: left;
`;

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const normalizeItems = items => {
  if (!Array.isArray(items)) return items;
  // eslint-disable-next-line fp/no-mutating-methods
  return [...new Set(items.map(i => capitalize(i)))].sort();
};

const StoryItem = ({ title, item }) => {
  return (
    <Row>
      <Cell style={{ width: 112, minWidth: 112 }}>{title}</Cell>
      <Cell>
        <StoryItemWrapper>{item.join(", ")}</StoryItemWrapper>
      </Cell>
    </Row>
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
  // eslint-disable-next-line fp/no-unused-expression
  ["gif", "jpg", "jpeg", "png"].forEach(ext => {
    // eslint-disable-next-line fp/no-mutation
    if (xs.indexOf(ext) > -1) flag = true;
  });
  return flag;
};

const ViewContainer = ({ token, isLoggedIn }) => {
  const [content, setContent] = useState();
  const [msg, setMsg] = useState("");
  // const history = useHistory();

  const handleUrl = async url => {
    // eslint-disable-next-line fp/no-unused-expression
    setMsg("fetching results ... ");
    const storyContent = await fetchStory(url);
    return setContent(storyContent, setMsg(""));
  };

  if (!isLoggedIn) {
    // eslint-disable-next-line fp/no-mutating-methods, fp/no-unused-expression
    return <div>{JSON.stringify({ token, isLoggedIn })} not logged in</div>;
  }

  return (
    <ViewWrapper>
      <Panel>
        <Urlbar handleUrl={handleUrl} />
        <div>{msg}</div>
        <Row>
          <Cell>{content && content.siteName}</Cell>
          <Cell>{content && content.title}</Cell>
        </Row>
        <Row>
          <Cell>{content && content.byline} </Cell>
          <Cell>
            {content && `sentiment score: ${content.sentiments.score}`}
          </Cell>
        </Row>
        <Row>
          <Cell>{content && content.excerpt}</Cell>
        </Row>
        {content && content.sentences ? (
          <StoryText text={content.sentences} />
        ) : null}
        {content && content.what ? (
          <StoryItem title={"what"} item={normalizeItems(content.what)} />
        ) : null}
        {content && content.who ? (
          <StoryItem title={"who"} item={normalizeItems(content.who)} />
        ) : null}
        {content && content.who ? (
          <StoryItem title={"where"} item={normalizeItems(content.where)} />
        ) : null}
        {content && content.when ? (
          <StoryItem title={"when"} item={normalizeItems(content.when)} />
        ) : null}
        {content && content.quotes ? (
          <StoryItem title={"quotes"} item={normalizeItems(content.quotes)} />
        ) : null}
        <Row>
          {content &&
            content.urls &&
            content.urls.filter(isImage).map((url, i) => (
              <Cell key={`img-${i}`}>
                <img src={url} height="100px" />
              </Cell>
            ))}
        </Row>
        {content && content.emails ? (
          <StoryItem title={"emails"} item={normalizeItems(content.emails)} />
        ) : null}
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
