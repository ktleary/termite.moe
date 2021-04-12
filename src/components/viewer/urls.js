import React from "react";
import styled from "styled-components";
import { array } from "prop-types";
import { StoryItemTitle } from "./story-style";
import { gt, indexOf, or, reduce } from "ramda";
import { IMAGEEXTS } from "../../constants";
import { Cell, Row } from "./grid";
import { checkMatch } from "./helpers";

const LinkCell = styled(Cell)`
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: block;
  font-size: 87%;
  text-transform: lowercase;
  width: 100%;
`;

const qualifyImageUrl = url =>
  gt(indexOf("http", url), -1) ? url : "https://".concat(url);

const isImage = xs =>
  reduce((result, ext) => or(result, checkMatch(xs, ext)), false, IMAGEEXTS);

const Urls = ({ urls }) => (
  <Row>
    <StoryItemTitle>Links:</StoryItemTitle>
    {urls.map(qualifyImageUrl).map((url, i) =>
      isImage(url) ? (
        <Cell key={`img-${i}`}>
          <img src={url} height="200px" />
        </Cell>
      ) : (
        <LinkCell key={`img-${i}`}>{url}</LinkCell>
      )
    )}
  </Row>
);

export default Urls;

Urls.propTypes = {
  urls: array,
};
