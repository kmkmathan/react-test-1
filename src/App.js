import "./App.css";
import { React, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Wrapper from "./layout/wrapper";
import LaunchCard from "./components/lauch-card";
import RocketCard from "./components/rocket-card";
import Grid from "./layout/grid";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ContentSelector = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    padding: 10px;
    min-width: 100px;
    margin-right: 10px;
  }

  input{
    border: none;
    background: #b3c7cc;
    width: 270px;
    padding: 15px 10px;
    margin-left: auto;
    color: #ffffff;
  }
`;

function App() {
  const [data, setData] = useState({ launches: [], rockets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:5000/api/v1/launches?limit=12", config
      );

      console.log(result.data.data.docs);

      setData({ launches: result.data.data.docs });
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Section>
        <ContentSelector>
          <button>Launches</button>
          <button>Rockets</button>
          <input placeholder="Search here" type="search"/>
        </ContentSelector>
      </Section>
      <Switch>
        <Route path="/launches">
          <Section>
            {loading && <div>loading....</div>}

            {!loading && (
              <Wrapper>
                <Grid>
                  {data.launches.map((item, index) => (
                    <LaunchCard
                      key={index.toString()}
                      image={item.links.patch.small}
                      title={item.name}
                      description={item.details}
                    />
                  ))}
                </Grid>
              </Wrapper>
            )}
          </Section>
        </Route>
        <Route path="/rockets">
          <Section>
            {loading && <div>loading....</div>}

            {!loading && (
              <Wrapper>
                <Grid>
                  {data.launches.map((item, index) => (
                    <RocketCard
                      key={index.toString()}
                      image={item.links.patch.small}
                      title={item.name}
                      description={item.details}
                    />
                  ))}
                </Grid>
              </Wrapper>
            )}
          </Section>
        </Route>
      </Switch>
    </MainWrapper>
  );
}

export default App;