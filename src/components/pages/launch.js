import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Section from "../../layout/section";
import Wrapper from "../../layout/wrapper";
import LaunchCard from "../lauch-card";
import Grid from "../../layout/grid";
import loader from "../../images/loader.gif";

const Image = styled.img`
    height: auto;
    text-align: center;
    margin: 20px auto;
    width: 100px;
    display: block;
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

const Nosearch = styled.div`
    width: 90%;
    margin: 50px auto;
    font-size: 18px;
`;

function Launch() {
    const [data, setData] = useState({ launches: []});
    const [loading, setLoading] = useState(true);
    const [searchparam, setSearchparam] = useState('');
    const [offsetpage, setOffsetpage] = useState(0);
    const [loadpage, setLoadpage] = useState(true);
    
    window.onscroll = () => {
        if ((window.pageYOffset + window.innerHeight + 100) >= document.body.clientHeight && !loading && loadpage) {
            setLoadpage(false);
            setOffsetpage(offsetpage + 1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:5000/api/v1/launches?limit=12&search=${searchparam}&page=${offsetpage}`
            );
            let dataArray = [...data.launches, ...result.data.result.docs];
            setData({ launches:  dataArray});
            setLoading(false);
            setLoadpage(true);
        };
        fetchData();
    }, [searchparam, offsetpage]);

    return (
        <>
            <Section>
                <ContentSelector>
                    <button>Launches</button>
                    <button>Rockets</button>
                    <input onChange={(e) => { setLoading(true);setData({ launches: []});setSearchparam(e.target.value);setOffsetpage(0)}} defaultValue={searchparam} placeholder="Search here" type="search"/>
                </ContentSelector>
            </Section>
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
                {data.launches?.length === 0 && !loading  && <Nosearch>No data found related to the serach value: <strong>{searchparam}</strong> </Nosearch>}
                {data.launches?.length > 0 && !loadpage && <Image src={loader} />}
            </Section>
        </>
    )
}

export default Launch;