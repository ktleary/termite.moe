import React from "react";
import PropTypes from "prop-types";
import { lenGt0 } from "./helpers";
import { Cell } from "./grid";

const SiteName = ({ name }) => (lenGt0(name) ? <Cell>{name}</Cell> : null);

export default SiteName;

SiteName.propTypes = {
  name: PropTypes.string,
};
