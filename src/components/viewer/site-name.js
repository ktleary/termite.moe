import React from "react";
import PropTypes from "prop-types";
import { lenGt0 } from "./helpers";
import { Cell } from "./grid";

// eslint-disable-next-line fp/no-nil
const SiteName = ({ name }) => (lenGt0(name) ? <Cell>{name}</Cell> : null);

export default SiteName;

// eslint-disable-next-line fp/no-mutation
SiteName.propTypes = {
  name: PropTypes.string,
};
