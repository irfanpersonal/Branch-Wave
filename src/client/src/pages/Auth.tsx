import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {toggleAuthType} from '../features/user/userSlice';
import {RegisterBox, LoginBox} from '../components';
import {registerUser, loginUser} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';

const Auth: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {wantsToRegister, user, authLoading} = useSelector((store: useSelectorType) => store.user); 
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const formData = new FormData();
        if (wantsToRegister) {
            formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
            formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
            formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
            formData.append('country', (target.elements.namedItem('country') as HTMLInputElement).value);
            dispatch(registerUser(formData));
            return;
        }
        formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
        formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
        dispatch(loginUser(formData));
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToRegister ? 'Register' : 'Login'}</h1>
                {wantsToRegister ? (
                    <RegisterBox/>
                ) : (
                    <LoginBox/>
                )}
                <p onClick={() => {
                    dispatch(toggleAuthType());
                }}>{wantsToRegister ? `Have an account?` : `Don't have an account?`}</p>
                <button disabled={authLoading}>{authLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        margin-top: 1rem;
        padding: 1rem;
        width: 50%;
        h1 {
            text-align: center;
        }
        label {
            display: block;
            margin-top: 0.5rem;
        }
        input, button {
            width: 100%;
            padding: 0.5rem;
            outline: 1px solid rgb(204, 204, 204);
            border: none;
            border-radius: 0.25rem;
        }
        p {
            text-align: center;
            margin-top: 1rem;
            cursor: pointer;
            user-select: none;
        }
        p:hover {
            color: gray;
        }
        button {
            user-select: none;
            cursor: pointer;
            margin-top: 1rem;
        }
    }
`;

export default Auth;