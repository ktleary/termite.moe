import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";
import Home from "./components/home";
import Tools from "./components/tools";
import About from "./components/about";

import Header from "./components/header";

const Main = styled.main`
  margin: auto;
  max-width: 1100px;
  padding: 16px;
`

const App = () => (
  <div clasname="App">
    <Helmet>
      <html lang="en" />
      <title>Source Lifter Home</title>
      <meta name="description" content="Extract sources from text." />
    </Helmet>

    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tools">
            <Tools />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </Router>
  </div>
);

export default App;
