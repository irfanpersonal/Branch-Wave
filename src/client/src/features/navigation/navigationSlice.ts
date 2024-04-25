import {createSlice} from '@reduxjs/toolkit';
import {getCurrentPageLocation} from '../../utils';
import {getSingleUser} from '../user/userThunk';
import { createLink } from '../link/linkThunk';

interface INavigate {
    location: string
}

const initialState: INavigate = {
    location: getCurrentPageLocation()
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSingleUser.rejected, (state) => {
            state.location = state.location === `/` ? `/#` : `/`;
        }).addCase(createLink.fulfilled, (state) => {
            state.location = state.location === '/profile' ? '/profile#' : '/profile';
        });
    }
});

export const {} = navigationSlice.actions;

export default navigationSlice.reducer;