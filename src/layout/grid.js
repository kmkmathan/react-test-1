import * as React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { device } from '../helpers';

export const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media ${device.laptop} {
        width: calc(100% + 20px);
        margin: -20px 0 0 -20px;
    }
`

const GridBox = styled.div`
    display: flex;
    margin-bottom: 30px;
    width: 100%;

    @media ${device.laptop} {
        width: calc((100% - 60px) / 3);
        margin: 20px 0 0 20px;
    }

    & > * {
        flex: 1;
  }

`

const GridLayout = (props) => (
    <GridContainer>
        {props.children.map((Child, index) => <GridBox key={index}>{Child}</GridBox>)}
    </GridContainer>
);

GridLayout.defaultProps = {
    children: PropTypes.element.isRequired,
};

export default GridLayout;