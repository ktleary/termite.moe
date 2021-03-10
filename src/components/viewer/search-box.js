import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { not } from "ramda";
import { lenLt0 } from "./helpers";
import { Input, InputContainer } from "./input";
import CloseButton from "./buttons/CloseButton";
import SubmitButton from "./buttons/SubmitButton";
import ButtonHolder from "./button-holder";

const ViewCloseButton = styled(CloseButton)`
  border-radius: 6px;
  color: rgba(235, 235, 245, 0.6);
  cursor: pointer;
  height: 20px;
  width: 20px;
  &:hover {
    color: rgba(235, 235, 245, 1);
  }
`;

const ViewSubmitButton = styled(SubmitButton)`
  border-radius: 6px;
  color: rgba(235, 235, 245, 0.6);
  background: transparent;
  height: 20px;
  width: 20px;
`;

const SearchWrapper = styled.div`
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  margin-top: 25%;
  width: 100%;
`;

const SearchBox = ({
  handleChange,
  handleClose,
  handleSubmit,
  url,
  urlValid,
}) => {
  return (
    <SearchWrapper>
      <InputContainer>
        <Input
          onChange={handleChange}
          placeholder="Search"
          type="text"
          name="searchbox"
          id="searchbox"
          value={url}
          autoFocus
          data-testid="input"
        />
      </InputContainer>
      <ButtonHolder onClick={handleClose}>
        <ViewCloseButton disabled={lenLt0(url)} />
      </ButtonHolder>
      <ButtonHolder>
        <ViewSubmitButton disabled={not(urlValid)} onClick={handleSubmit} />
      </ButtonHolder>
    </SearchWrapper>
  );
};

export default SearchBox;

// eslint-disable-next-line fp/no-mutation
SearchBox.propTypes = {
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  url: PropTypes.string,
  urlValid: PropTypes.bool,
};
