import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Section from "../../layout/section";
import Wrapper from "../../layout/wrapper";
import RocketCard from "../rocket-card";
import Grid from "../../layout/grid";

const ContentSelector = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;

    button {
        border: none;
        padding: 10px;
        min-width: 100px;
        margin-right: 10px;
    }
`;

function Rocket() {
    const [datarockets, setDatarockets] = useState({ rockets: [] });
    const [loadingrockets, setLoadingrockets] = useState(true);
    
    useEffect(() => {
        const fetchRocketData = async () => {
            const result = await axios(
                "http://localhost:5000/api/v1/rockets?limit=12"
            );
            setDatarockets({ rockets: result.data.result.docs });
            setLoadingrockets(false);
        };
        fetchRocketData();
    }, []);

    return (
        <>
            <Section>
                <ContentSelector>
                    <button>Launches</button>
                    <button>Rockets</button>
                </ContentSelector>
            </Section>
            <Section>
                {loadingrockets && <div>loading....</div>}

                {!loadingrockets && (
                <Wrapper>
                    <Grid>
                    {datarockets.rockets.map((item, index) => (
                        <RocketCard
                        key={index.toString()}
                        image={item.flickr_images[0]}
                        title={item.name}
                        description={item.details}
                        />
                    ))}
                    </Grid>
                </Wrapper>
                )}
          </Section>
        </>
    )
}

export default Rocket;
