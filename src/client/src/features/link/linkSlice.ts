import {createSlice} from '@reduxjs/toolkit';
import {createLink, getLinksForUser, deleteLink, editLink} from './linkThunk';
import {toast} from 'react-toastify';

export type LinkType = {
    id: string,
    icon: string,
    title: string,
    link: string,
    userId: string,
    createdAt: string,
    updatedAt: string
};

interface ILink {
    getLinksForUserLoading: boolean,
    links: LinkType[],
    totalLinks: number | null,
    numberOfPages: number | null,
    searchBoxValues: {
        page: number | ''
    },
    createLinkLoading: boolean,
    deleteLinkLoading: boolean,
    editLinkLoading: boolean
}

const initialState: ILink = {
    getLinksForUserLoading: true,
    links: [],
    totalLinks: null,
    numberOfPages: null,
    searchBoxValues: {
        page: 1
    },
    createLinkLoading: false,
    deleteLinkLoading: false,
    editLinkLoading: false
};

const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.searchBoxValues.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLinksForUser.pending, (state) => {
            state.getLinksForUserLoading = true;
        }).addCase(getLinksForUser.fulfilled, (state, action) => {
            state.getLinksForUserLoading = false;
            state.links = action.payload.links;
            state.totalLinks = action.payload.totalLinks;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getLinksForUser.rejected, (state) => {
            state.getLinksForUserLoading = true;
        }).addCase(createLink.pending, (state) => {
            state.createLinkLoading = true;
        }).addCase(createLink.fulfilled, (state, action) => {
            state.createLinkLoading = false;
            toast.success('Created Link!');
        }).addCase(createLink.rejected, (state, action) => {
            state.createLinkLoading = false;
            toast.error(action.payload as string);
        }).addCase(deleteLink.pending, (state) => {
            state.deleteLinkLoading = true;
        }).addCase(deleteLink.fulfilled, (state) => {
            state.deleteLinkLoading = false;
            toast.success('Deleted Link');
        }).addCase(deleteLink.rejected, (state, action) => {
            state.deleteLinkLoading = false;
            toast.error(action.payload as string);
        }).addCase(editLink.pending, (state) => {
            state.editLinkLoading = true;
        }).addCase(editLink.fulfilled, (state, action) => {
            state.editLinkLoading = false;
            toast.success('Edited Link');
        }).addCase(editLink.rejected, (state, action) => {
            state.editLinkLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {setPage} = linkSlice.actions;

export default linkSlice.reducer;