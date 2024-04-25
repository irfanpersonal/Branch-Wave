import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './features/navigation/navigationSlice';
import userReducer from './features/user/userSlice';
import linkReducer from './features/link/linkSlice';

const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        user: userReducer,
        link: linkReducer
    }
});

export type useDispatchType = typeof store.dispatch;

export type useSelectorType = ReturnType<typeof store.getState>;

export default store;