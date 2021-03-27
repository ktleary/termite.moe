import React from "react";
import { array } from "prop-types";
import { gt, indexOf, or, reduce } from "ramda";
import { IMAGEEXTS } from "../../constants";
import { Cell, Row } from "./grid";
import { checkMatch } from "./helpers";

const qualifyImageUrl = url =>
  gt(indexOf("http", url), -1) ? url : "https://".concat(url);

const isImage = xs =>
  reduce((result, ext) => or(result, checkMatch(xs, ext)), false, IMAGEEXTS);

const Urls = ({ urls }) => (
  <Row>
    {urls.map(qualifyImageUrl).map((url, i) =>
      isImage(url) ? (
        <Cell key={`img-${i}`}>
          <img src={url} height="200px" />
        </Cell>
      ) : (
        <Cell key={`img-${i}`}>{url}</Cell>
      )
    )}
  </Row>
);

export default Urls;

Urls.propTypes = {
  urls: array,
};
