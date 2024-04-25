import {createAsyncThunk} from '@reduxjs/toolkit';
import {type useSelectorType} from '../../store';
import axios from 'axios';

export const showCurrentUser = createAsyncThunk('user/showCurrentUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/user/showCurrentUser');
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const registerUser = createAsyncThunk('user/registerUser', async(userData: FormData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/register', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async(userData: FormData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/login', userData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/auth/logout');
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const checkIfNameIsAvailable = createAsyncThunk('user/checkIfNameIsAvailable', async(name: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/user/${name}`);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getAllUsers = createAsyncThunk('user/getAllUsers', async(_, thunkAPI) => {
    try {
        const {searchBoxValues} = (thunkAPI.getState() as useSelectorType).user;
        const response = await axios.get(`/api/v1/user?search=${searchBoxValues.search}&country=${searchBoxValues.country}&page=${searchBoxValues.page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleUser = createAsyncThunk('user/getSingleUser', async(name: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/user/${name}`);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editProfile = createAsyncThunk('user/editProfile', async(inputData: FormData, thunkAPI) => {
    try {
        const response = await axios.patch('/api/v1/user/updateUser', inputData);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});