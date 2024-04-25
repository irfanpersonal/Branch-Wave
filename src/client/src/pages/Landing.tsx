import React from 'react';
import styled from 'styled-components';
import {FaTreeCity} from 'react-icons/fa6';
import {AvailableName} from '../components';

const Landing: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <div className="icon"><FaTreeCity/></div>
            <div className="title">Branch Wave</div>
            <p className="subheading">Effortlessly Manage Your Online Presence</p>
            <p className="description">Connect and share all your links from a single hub!</p>
            <AvailableName/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .icon {
        font-size: 4rem;
        color: #4CAF50;
    }
    .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.5rem;
    }
    .subheading {
        font-size: 1.5rem;
        color: gray;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .description {
        font-size: 1.25rem;
        color: gray;
        text-align: center;
        margin-bottom: 1rem;
    }
`;

export default Landing;
