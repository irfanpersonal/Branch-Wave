import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {getAllUsers} from '../features/user/userThunk';
import {Loading, UserList} from '../components';
import {countries} from '../utils';
import {updateSearchBoxValues, setPage} from '../features/user/userSlice';

const Users: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {getAllUsersLoading, users, totalUsers, numberOfPages, searchBoxValues} = useSelector((store: useSelectorType) => store.user);
    React.useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <Wrapper>
            <div className="search-box">
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="search" name="search" value={searchBoxValues.search} onChange={(event) => dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <select id="country" name="country" value={searchBoxValues.country} onChange={(event) => dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}))}>
                        {countries.map((country: string) => {
                            return (
                                <option key={country} value={country}>{country}</option>
                            );
                        })}
                    </select>
                </div>
                <button onClick={() => {
                    dispatch(setPage(1));
                    dispatch(getAllUsers());
                }} disabled={getAllUsersLoading}>{getAllUsersLoading ? 'Searching' : 'Search'}</button>
            </div>
            {getAllUsersLoading ? ( 
                <Loading title="Loading All Users" position='normal' marginTop='1rem'/>
            ) : (
                <UserList data={users} numberOfPages={numberOfPages as number} page={searchBoxValues.page as number} totalUsers={totalUsers as number} changePage={setPage} updateSearch={getAllUsers}/>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .search-box {
        width: 50%;
        margin: 0 auto;
        outline: 1px solid black;
        padding: 1rem;
        label {
            display: block;
        }
        input, select, button {
            padding: 0.25rem;
            width: 100%;
        }
        div > label {
            margin-top: 1rem;
        }
        button {
            margin-top: 1rem;
        }
    }
`;

export default Users;