import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';

const Home: React.FunctionComponent = () => {
    const {user} = useSelector((store: useSelectorType) => store.user);
    return (
        <Wrapper>
            <h1>Welcome to Branch Wave!</h1>
            <p>Branch Wave helps you organize and share all your important links in one place.</p>
            <h2>Quick Links</h2>
            {user ? (
                <>
                    <Link to='/users'>Search Users</Link>
                    <Link to='/profile'>View Profile</Link>
                    <Link to='/add-link'>Add Link</Link>
                </>
            ) : (
                <>
                    <Link to='/users'>Search Users</Link>
                    <Link to='/auth'>Register/Login</Link>
                    <Link to='/landing'>Name Checker</Link>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    padding: 50px;
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    h2 {
        border-bottom: 1px solid black;
    }
    a {
        display: block;
        margin: 1rem 0;
        background-color: lightblue;
        padding: 0.25rem;
        text-decoration: none;
        outline: 1px solid black;
        color: black;
    }
    p {
        margin-bottom: 2.5rem;
        font-size: 1.2rem;
    }
    h3 {
        margin: 1rem 0;
    }
`;

export default Home;