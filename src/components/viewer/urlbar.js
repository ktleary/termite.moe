import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, InputContainer } from "./input";

const UrlbarContainer = styled.div``;
const UrlForm = styled.form``;

const Urlbar = ({ handleUrl }) => {
  const [url, setUrl] = useState("");
  const handleSubmit = e => {
    // eslint-disable-next-line fp/no-unused-expression
    e.preventDefault();
    return handleUrl(url);
  };
  const handleChange = e => {
    const { value } = e.target;
    return setUrl(value);
  };

  return (
    <UrlbarContainer>
      <UrlForm onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            id="urlbar"
            name="urlbar"
            placeholder="URL"
            onChange={handleChange}
          />
        </InputContainer>
      </UrlForm>
    </UrlbarContainer>
  );
};

export default Urlbar;

// eslint-disable-next-line fp/no-mutation
Urlbar.propTypes = {
  handleUrl: PropTypes.func.isRequired,
};
