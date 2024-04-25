import styled from 'styled-components';
import emptyProfilePicture from '../images/empty-profile-picture.jpeg';
import {type UserType} from "../features/user/userSlice";
import {Link} from 'react-router-dom';

interface UserListItemProps {
    data: UserType
}

const UserListItem: React.FunctionComponent<UserListItemProps> = ({data}) => {
    return (
        <Wrapper>
            <img className="user-pfp" src={data.profilePicture || emptyProfilePicture} alt={data.name}/>
            <h1>{data.name}</h1>
            <Link to={`/users/${data.name}`}>View</Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    outline: 1px solid black;
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    .user-pfp {
        width: 5rem;
        height: 5rem;
        outline: 1px solid black;
        border-radius: 50%;
    }
    a {
        display: block;
        color: white;
        text-decoration: none;
        background-color: green;
        margin-top: 0.5rem;
        outline: 1px solid black;
    }
`;

export default UserListItem;