import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';

const Navbar: React.FunctionComponent = () => {
    const {user} = useSelector((store: useSelectorType) => store.user);
    const navigate = useNavigate();
    return (
        <Wrapper>
            <div onClick={() => {
                navigate('/');
            }} className="title">Branch Wave</div>
            <div className="nav-links">
                <NavLink to='/'>Home</NavLink>
                {user && (
                    <NavLink to='/add-link'>Add Link</NavLink>
                )}
                <NavLink to='/users'>Users</NavLink>
                {user && (
                    <NavLink to='/profile'>Profile</NavLink>
                )}
                {!user && (
                    <NavLink to='/auth'>Register/Login</NavLink>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    color: white;
    border-bottom: 1px solid black;
    .title {
        font-size: 1.25rem;
        user-select: none;
        cursor: pointer;
    }
    .nav-links {
        a {
            margin-left: 1rem;
            text-decoration: none;
            color: white;
        }
        .active {
            border-bottom: 1px solid white;
        }
    }
`;

export default Navbar;