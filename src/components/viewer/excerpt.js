import React from "react";
import { string } from "prop-types";
import { Row } from "./grid";
import ContentItem from "./content-item";

const Excerpt = ({ excerpt }) => (
  <Row>
    <ContentItem itemContent={excerpt} />
  </Row>
);

export default Excerpt;

Excerpt.propTypes = {
  excerpt: string,
};
