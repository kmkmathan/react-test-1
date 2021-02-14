import * as React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { device } from '../helpers';

export const GridLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media ${device.laptop} {
    margin: -20px 0 0 -20px;
    width: calc(100% + 20px);
  }
`

const GridItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;

  & > * {
    flex: 1;
  }

  @media ${device.laptop} {
    margin: 20px 0 0 20px;
    width: calc((100% - 60px) / 3);
  }
`

const GridContainer = (props) => (
  <GridLayout>
    {props.children.map((Child, index) => <GridItem key={index}>{Child}</GridItem>)}
  </GridLayout>
);

GridContainer.defaultProps = {
  children: PropTypes.element.isRequired,
};

export default GridContainer