import React from 'react';
import styled from 'styled-components';
import {type LinkType} from "../features/link/linkSlice";
import {EditLink, LinkListData} from '../components';

interface LinkListItemProps {
    data: LinkType,
    editable: boolean
}

const LinkListItem: React.FunctionComponent<LinkListItemProps> = ({data, editable}) => {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    return (
        <Wrapper>
            {isEditing ? (
                <EditLink data={data} setIsEditing={setIsEditing}/>
            ) : (
                <LinkListData data={data} editable={editable} setIsEditing={setIsEditing}/>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    outline: 1px solid black;
    margin-bottom: 1rem;
    padding: 1rem;
    text-align: center;
    .mt {
        margin-top: 0.5rem;
    }
    .option {
        cursor: pointer;
        text-decoration: none;
        display: block;
        background-color: black;
        color: white;
        margin-top: 0.5rem;
        padding: 0.25rem;
    }
    label {
        display: block;
        text-align: left;
    }
    input, select, button {
        width: 100%;
        padding: 0.25rem;  
        margin: 0.25rem 0;
    }
`;

export default LinkListItem;