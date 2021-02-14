import "./App.css";
import { React } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Launch from "./components/pages/launch";
import Rocket from "./components/pages/rocket";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-wrap: wrap;
  }
`;

function App() {
  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Switch>
        <Route path="/launches" component={Launch} />
        <Route path="/rockets" component={Rocket} />
      </Switch>
    </MainWrapper>
  );
}

export default App;