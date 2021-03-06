import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Helmet } from "react-helmet";
import "./App.css";
import Home from "./components/home";
import Login from "./components/auth/login";
import About from "./components/about";
import ViewContainer from "./components/viewer/view-container";
import ViewHeader from "./components/viewer/view-header";
import useToken from "./components/auth/useToken";

import Header from "./components/header";

const Main = styled.main`
  margin: auto;
  max-width: 1100px;
  padding: 16px;
`;

function App() {
  const { token, setToken } = useToken();

  return (
    <div clasname="App">
      <Helmet>
        <html lang="en" />
        <title>PostWorm Home</title>
        <meta name="description" content="Extract sources from text." />
      </Helmet>

      <Router>
        <Main>
          <Switch>
            <Route path="/viewer">
              <ViewHeader />
              <ViewContainer token={token} />
            </Route>
            <Route path="/about">
              <Header />
              <About />
            </Route>
            <Route path="/login">
              <Header />
              <Login setToken={setToken} />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </Main>
      </Router>
    </div>
  );
}

export default App;
