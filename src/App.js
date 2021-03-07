import React, { useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import * as R from "ramda";
import "./App.css";
import Home from "./components/home";
import Login from "./components/auth/login";
import About from "./components/about";
import ViewContainer from "./components/viewer/view-container";
import useToken from "./components/auth/useToken";

import Header from "./components/header";

const Main = styled.main`
  margin: auto;
  max-width: 1100px;
  padding: 0;
`;

const checkAuth = token => {
  // eslint-disable-next-line fp/no-unused-expression
  console.log({ token });
  // eslint-disable-next-line fp/no-unused-expression
  console.log({ gt1: R.length(R.toString(token)) });
  return R.gt(R.length(token), 1);
};

function App() {
  const { token, setToken } = useToken();

  // eslint-disable-next-line fp/no-unused-expression
  console.log(token);
  const isLoggedIn = useMemo(() => checkAuth(token));

  return (
    <div clasname="App">
      <Helmet>
        <html lang="en" />
        <title>Beetz Home</title>
        <meta name="description" content="Extract sources from text." />
      </Helmet>
      <Router>
        <Main>
          <Header isLoggedIn={isLoggedIn} setToken={setToken} />
          <Switch>
            <Route path="/viewer">
              <ViewContainer token={token} isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Main>
      </Router>
    </div>
  );
}

export default App;
