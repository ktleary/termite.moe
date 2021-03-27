import React from "react";
import { string } from "prop-types";
import { Row } from "./grid";
import SiteName from "./site-name";
import Title from "./title";

const ContentHeader = ({ siteName, title }) => (
  <Row>
    <SiteName name={siteName} />
    <Title title={title} />
  </Row>
);

export default ContentHeader;

ContentHeader.propTypes = {
  siteName: string,
  title: string,
};
