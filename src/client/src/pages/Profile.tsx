import React from 'react';
import styled from 'styled-components';
import emptyProfilePicture from '../images/empty-profile-picture.jpeg';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {getSingleUser, logoutUser} from '../features/user/userThunk';
import {getLinksForUser} from '../features/link/linkThunk';
import {Loading, EditProfile, LinkList} from '../components';
import {FaEdit} from 'react-icons/fa';
import {setPage} from '../features/link/linkSlice';

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {logoutLoading, user, getSingleUserLoading, singleUser} = useSelector((store: useSelectorType) => store.user);
    const {getLinksForUserLoading, links, totalLinks, numberOfPages, searchBoxValues} = useSelector((store: useSelectorType) => store.link);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    React.useEffect(() => {
        dispatch(getSingleUser(user!.name));
        dispatch(getLinksForUser(user!.name));
    }, []);
    return (
        <Wrapper>
            <h1 className='title'>My Profile</h1>
            {getSingleUserLoading ? (
                <Loading title='Loading Profile Data' position='normal' marginTop='1rem'/>
            ) : (
                <div className='user-info'>
                    <img className='user-pfp' src={singleUser!.profilePicture || emptyProfilePicture} alt={singleUser!.name}/>
                    {isEditing ? (
                        <EditProfile data={singleUser!} setIsEditing={setIsEditing}/>
                    ) : (
                        <div>
                            <p><span>Name:</span>{singleUser!.name}</p>
                            <p><span>Email:</span>{singleUser!.email}</p>
                            <p><span>Country:</span>{singleUser!.country}</p>
                            <p><span>Bio:</span>{singleUser!.bio ? singleUser!.bio : 'No Bio'}</p>
                            <p><span>Joined:</span>{moment(singleUser!.createdAt).format('MMMM Do YYYY')}</p>
                            <button onClick={() => {
                                setIsEditing(currentState => {
                                    return !currentState;
                                });
                            }}><FaEdit/></button>
                        </div>
                    )}
                </div>
            )}
            {getLinksForUserLoading ? (
                <Loading title='Loading Links for User Data' position='normal' marginTop='1rem'/>
            ) : (
                <>
                    {(totalLinks! > 0) ? (
                        <LinkList data={links} numberOfPages={numberOfPages as number} page={searchBoxValues.page as number} totalLinks={totalLinks as number} changePage={setPage} updateSearch={getLinksForUser} _id={user!.name} editable={true}/>
                    ) : (
                        <h1 className="no-links">No Links</h1>
                    )}
                </>
            )}
            <button disabled={logoutLoading} onClick={() => {
                dispatch(logoutUser());
            }} className="logout-btn">{logoutLoading ? 'Logging Out' : 'Logout'}</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .title {
        border-bottom: 1px solid black;
    }
    .logout-btn {
        width: 100%;
        padding: 0.25rem;
    }
    .user-info {
        margin-top: 1rem;
        display: flex;
        .user-pfp {
            width: 5rem;
            height: 5rem;
            outline: 1px solid black;
            margin-right: 1rem;
        }
        p {
            margin-bottom: 0.5rem;
            span {
                margin-right: 0.25rem;
            }
        }
        button {
            margin-right: 1rem;
            font-size: 1.25rem;
            padding: 0 0.5rem;
        }
    }
    .no-links {
        text-align: center;
        margin: 1rem 0;
        border-bottom: 1px solid black;
    }
`;

export default Profile;