import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ViewWrapper = styled.div`
  width: 100vw;
  max-width: 1100px;
`;
const ViewTitle = styled.div``;

const ViewContainer = ({ token }) => {
  const history = useHistory();

  if (!token) {
    // eslint-disable-next-line fp/no-mutating-methods
    return history.push("/login");
  }
  return (
    <ViewWrapper>
      <ViewTitle>Welcome to the View!</ViewTitle>
    </ViewWrapper>
  );
};

export default ViewContainer;

// eslint-disable-next-line fp/no-mutation
ViewContainer.propTypes = {
  setToken: PropTypes.func,
  token: PropTypes.string,
};
