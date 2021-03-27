import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Cell, Row } from "./grid";
import { lenGt0 } from "./helpers";

const MessageWrapper = styled(Cell)`
  align-self: center;
  color: rgba(187, 134, 252, 1);
  height: 32px;
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

const Message = ({ message }) =>
  lenGt0(message) ? (
    <Row>
      <MessageWrapper>{message}</MessageWrapper>
    </Row>
  ) :
  null;

export default Message;

Message.propTypes = {
  message: PropTypes.string,
};
