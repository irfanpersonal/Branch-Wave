import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {checkIfNameIsAvailable} from '../features/user/userThunk';
import {setCheckIfNameIsAvailableStatus} from '../features/user/userSlice';
import {Link} from 'react-router-dom';

const AvailableName: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {checkIfNameIsAvailableLoading, checkIfNameIsAvailableStatus} = useSelector((store: useSelectorType) => store.user);
    const handleCheck = () => {
        const nameInput = document.querySelector('#name') as HTMLInputElement;
        if (nameInput.value) {
            dispatch(checkIfNameIsAvailable(nameInput.value));
        }
        else {
            dispatch(setCheckIfNameIsAvailableStatus('Please provide a name to check!'));
        }
    }
    return (
        <Wrapper>
            <div className="input-wrapper">
                <input id="name" type="search" name="name" placeholder='Desired name' onChange={(event) => {
                    console.log(event.target.value);
                    if (!event.target.value) {
                        dispatch(setCheckIfNameIsAvailableStatus(''));
                    }
                }}/>
                <button disabled={checkIfNameIsAvailableLoading} onClick={handleCheck}>{checkIfNameIsAvailableLoading ? 'Checking' : 'Check'}</button>
            </div>
            <div className="status">{checkIfNameIsAvailableStatus}</div>
            {checkIfNameIsAvailableStatus.includes('available') && (
                <Link className="auth-link" to='/auth'>Register!</Link>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .input-wrapper {
        display: flex;
        margin-bottom: 1rem;
    }   
    input, button {
        padding: 0.25rem;
        border: none;   
        outline: none;
    }
    input {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
    }
    button {
        border: 1px solid black;
    }
    .status {
        margin: 0.25rem 0;
        text-align: center;
        border-bottom: 1px solid black;
    }
    .auth-link {
        margin-top: 1rem;
        background-color: rgb(76, 175, 80);
        padding: 0.25rem 1rem;
        border-radius: 0.25rem;
        outline: 1px solid black;
        color: white;
        text-decoration: none;
    }
`;

export default AvailableName;