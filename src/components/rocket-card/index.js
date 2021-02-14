import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "../image";
import Lockup from "../lockup";

const RocketCardContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const ImagContainer = styled.div`
  padding: 40px 20px;
  background-color: #b3c7cc;
  position: relative;
  margin-top: auto;

  img {
    height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #f6f7f7;
  flex: 1;
`;

function RocketCard(props) {
  return (
      <RocketCardContainer>
        <ImagContainer>
          <Image url={props.image} />
        </ImagContainer>

        <Content>
          <Lockup text={props.description} tag="h3" title={props.title} />
        </Content>
      </RocketCardContainer>
  );
}

RocketCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default RocketCard;
