import React from 'react';
import styled from 'styled-components';
import emptyProfilePicture from '../images/empty-profile-picture.jpeg';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {Loading, LinkList} from '../components';
import {getSingleUser} from '../features/user/userThunk';
import {setPage} from '../features/link/linkSlice';
import {getLinksForUser} from '../features/link/linkThunk';
import {useParams} from 'react-router-dom';

const SingleUser: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {getSingleUserLoading, singleUser} = useSelector((store: useSelectorType) => store.user);
    const {getLinksForUserLoading, links, totalLinks, numberOfPages, searchBoxValues} = useSelector((store: useSelectorType) => store.link);
    const {name} = useParams();
    React.useEffect(() => {
        dispatch(getSingleUser(name!));
        dispatch(getLinksForUser(name!));
    }, []);
    return (
        <Wrapper>
            {getSingleUserLoading ? (
                <Loading title='Loading Single User' position='normal'/>
            ) : (
                <div>
                    <h1 className="name">{singleUser!.name}</h1>
                    <img className='user-pfp' src={singleUser!.profilePicture || emptyProfilePicture} alt={singleUser!.name}/>
                    <div className='email'>{singleUser!.email}</div>
                    <div className='country'>{singleUser!.country}</div>
                    <p className='bio'>{singleUser!.bio}</p>
                    {getLinksForUserLoading ? (
                        <Loading title="Loading Links for User" position='normal' marginTop='1rem'/>
                    ) : (
                        <LinkList data={links} numberOfPages={numberOfPages as number} page={searchBoxValues.page as number} totalLinks={totalLinks as number} changePage={setPage} updateSearch={getLinksForUser} _id={name} editable={false}/>
                    )}
                    <div>Joined {moment(singleUser!.createdAt).format('MMMM Do YYYY')}</div>
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    .name, .user-pfp, .email, .country {
        margin-bottom: 1rem;
    }
    .user-pfp {
        width: 5rem;
        height: 5rem;
        outline: 1px solid black;
    }
`;

export default SingleUser;