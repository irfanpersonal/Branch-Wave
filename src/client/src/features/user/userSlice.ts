import {createSlice} from '@reduxjs/toolkit';
import {showCurrentUser, registerUser, loginUser, logoutUser, checkIfNameIsAvailable, getAllUsers, getSingleUser, editProfile} from './userThunk';
import {toast} from 'react-toastify';

export type UserType = {
    id: string,
    name: string,
    email: string,
    bio: string,
    country: string,
    profilePicture: string,
    createdAt: string,
    updatedAt: string
};

interface IUser {
    globalLoading: boolean,
    wantsToRegister: boolean,
    authLoading: boolean,
    logoutLoading: boolean,
    checkIfNameIsAvailableLoading: boolean,
    checkIfNameIsAvailableStatus: string,
    getAllUsersLoading: boolean,
    users: UserType[],
    totalUsers: number | null,
    numberOfPages: number | null,
    searchBoxValues: {
        page: number | '',
        search: string,
        country: string
    },
    getSingleUserLoading: boolean,
    singleUser: UserType | null,
    editProfileLoading: boolean,
    user: UserType | null
}

const initialState: IUser = {
    globalLoading: true,
    wantsToRegister: true,
    authLoading: false,
    logoutLoading: false,
    checkIfNameIsAvailableLoading: false,
    checkIfNameIsAvailableStatus: '',
    getAllUsersLoading: true,
    users: [],
    totalUsers: null,
    numberOfPages: null,
    searchBoxValues: {
        page: 1,
        search: '',
        country: ''
    },
    getSingleUserLoading: true,
    singleUser: null,
    editProfileLoading: false,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleAuthType: (state) => {
            state.wantsToRegister = !state.wantsToRegister;
        },
        setCheckIfNameIsAvailableStatus: (state, action) => {
            state.checkIfNameIsAvailableStatus = action.payload;
        },
        updateSearchBoxValues: (state, action) => {
            state.searchBoxValues[action.payload.name as keyof typeof state.searchBoxValues] = action.payload.value;
        },
        setPage: (state, action) => {
            state.searchBoxValues.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showCurrentUser.pending, (state, action) => {
            state.globalLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action) => {
            state.globalLoading = false;
            state.user = action.payload;
        }).addCase(showCurrentUser.rejected, (state, action) => {
            state.globalLoading = false;
        }).addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Registered User!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(logoutUser.pending, (state) => {
            state.logoutLoading = true;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.user = null;
        }).addCase(logoutUser.rejected, (state) => {
            state.logoutLoading = false;
        }).addCase(checkIfNameIsAvailable.pending, (state) => {
            state.checkIfNameIsAvailableLoading = true;
        }).addCase(checkIfNameIsAvailable.fulfilled, (state, action) => {
            state.checkIfNameIsAvailableLoading = false;
            state.checkIfNameIsAvailableStatus = 'The name is already taken. Please try a different one.';
        }).addCase(checkIfNameIsAvailable.rejected, (state, action) => {
            state.checkIfNameIsAvailableLoading = false;
            state.checkIfNameIsAvailableStatus = 'The name is available! You can use this one.';
        }).addCase(getAllUsers.pending, (state) => {
            state.getAllUsersLoading = true;
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.getAllUsersLoading = false;
            state.users = action.payload.users;
            state.totalUsers = action.payload.totalUsers;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.getAllUsersLoading = false;
        }).addCase(getSingleUser.pending, (state) => {
            state.getSingleUserLoading = true;
        }).addCase(getSingleUser.fulfilled, (state, action) => {
            state.getSingleUserLoading = false;
            state.singleUser = action.payload;
        }).addCase(getSingleUser.rejected, (state) => {
            state.getSingleUserLoading = true;
        }).addCase(editProfile.pending, (state) => {
            state.editProfileLoading = true;
        }).addCase(editProfile.fulfilled, (state, action) => {
            state.editProfileLoading = false;
            state.singleUser = action.payload;
            toast.success('Edited Profile!');
        }).addCase(editProfile.rejected, (state, action) => {
            state.editProfileLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {toggleAuthType, setCheckIfNameIsAvailableStatus, updateSearchBoxValues, setPage} = userSlice.actions;

export default userSlice.reducer;