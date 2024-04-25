import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {icons} from '../utils';
import {createLink} from '../features/link/linkThunk';

const AddLink: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {createLinkLoading} = useSelector((store: useSelectorType) => store.link);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const formData = new FormData();
        formData.append('icon', (target.elements.namedItem('icon') as HTMLSelectElement).value);
        formData.append('title', (target.elements.namedItem('title') as HTMLInputElement).value);
        formData.append('link', (target.elements.namedItem('link') as HTMLInputElement).value); 
        dispatch(createLink(formData));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>Add Link</h1>
                <div>
                    <label htmlFor="icon">Icon</label>
                    <select id="icon" name="icon" required>
                        <option value=""></option>
                        {icons.map((icon: string) => {
                            return (
                                <option key={icon} value={icon}>{icon}</option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" required/>
                </div>
                <div>
                    <label htmlFor="link">Link</label>
                    <input id="link" type="url" name="link" required/>
                </div>
                <button disabled={createLinkLoading}>{createLinkLoading ? 'Creating' : 'Create'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        width: 50%;
        outline: 1px solid black;
        padding: 1rem;
        h1 {
            text-align: center;
            border-bottom: 1px solid black;
        }
        label {
            display: block;
            margin-top: 1rem;
        }
        input, select, button {
            width: 100%;
            padding: 0.25rem;
        }
        button {
            margin-top: 1rem;
        }
    }
`;

export default AddLink;