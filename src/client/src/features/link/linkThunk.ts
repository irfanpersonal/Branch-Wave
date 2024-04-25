import {createAsyncThunk} from '@reduxjs/toolkit';
import {type useSelectorType} from '../../store';
import axios from 'axios';

export const getLinksForUser = createAsyncThunk('link/getAllUserLinks', async(name: string, thunkAPI) => {
    try {
        const {searchBoxValues} = (thunkAPI.getState() as useSelectorType).link;
        const response = await axios.get(`/api/v1/user/${name}/getLinksForUser?page=${searchBoxValues.page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const createLink = createAsyncThunk('link/createLink', async(inputData: FormData, thunkAPI) => {
    try {
        const response = await axios.post(`/api/v1/link`, inputData);
        const data = response.data;
        return data.link;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteLink = createAsyncThunk('link/deleteLink', async(linkID: string, thunkAPI) => {
    try {
        const {user} = (thunkAPI.getState() as useSelectorType).user;
        const response = await axios.delete(`/api/v1/link/${linkID}`);
        const data = response.data;
        thunkAPI.dispatch(getLinksForUser(user!.name));
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editLink = createAsyncThunk('link/editLink', async(inputData: {data: FormData, linkID: string}, thunkAPI) => {
    try {
        const {user} = (thunkAPI.getState() as useSelectorType).user;
        const response = await axios.patch(`/api/v1/link/${inputData.linkID}`, inputData.data);
        const data = response.data;
        thunkAPI.dispatch(getLinksForUser(user!.name));
        return data.link;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});