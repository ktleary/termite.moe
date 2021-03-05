import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { validate, UNSAFEuserLogin } from "./login.service";
// import { log } from "../../util";

const LoginContainer = styled.div`
  max-width: 336px;
`;

const LoginTitle = styled.h1`
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
`;

const Cell = styled.div`
  flex-grow: 1;
  padding: 8px;
  margin: 8px;
`;

const Input = styled.input`
  width: 100%;
`;

const LoginForm = styled.form``;

const SubmitButton = styled.button`
  background-color: rgba(55, 0, 179, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.76);
  cursor: pointer;
  height: 40px;
  width: 80px;
  &:hover {
    background-color: rgba(55, 0, 179, 1);
    color: rgba(255, 255, 255, 1);
  }
  &:disabled {
    background-color: rgba(55, 0, 179, 0.33);
    color: rgba(255, 255, 255, 0.33);
    cursor: pointer;
  }
`;

const STATUS = Object.freeze({
  LOGINFAILED: "Login failed.",
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isValid = validate({ username, password });
  const history = useHistory();
  const handleChange = e => {
    const { name, value } = e.target;
    return name === "username" ? setUsername(value) : setPassword(value);
  };

  const handleSubmit = e => {
    // eslint-disable-next-line fp/no-unused-expression
    e.preventDefault();
    return !UNSAFEuserLogin({ username, password })
      ? setMessage(STATUS.LOGINFAILED)
      // eslint-disable-next-line fp/no-mutating-methods
      : history.push("/app");
  };

  return (
    <LoginContainer>
      <Row>
        <Cell>
          <LoginTitle>Login</LoginTitle>
        </Cell>
      </Row>
      <LoginForm>
        <Row>
          <Cell>User Name:</Cell>
          <Cell>
            <Input
              name="username"
              id="username"
              type="text"
              onChange={handleChange}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>Password:</Cell>
          <Cell>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>{message}</Cell>
        </Row>
        <Row>
          <Cell>
            <SubmitButton disabled={isValid === false} onClick={handleSubmit}>
              Login
            </SubmitButton>
          </Cell>
        </Row>
      </LoginForm>
    </LoginContainer>
  );
}
