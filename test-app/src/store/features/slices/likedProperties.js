import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const existingCookie = cookie.get('allLikedProperties');

const likedPropertiesSlice = createSlice({
    name: 'likedProperties',
    initialState: { data: existingCookie ? existingCookie : [] },
    reducers: {
        changeLikedProperties(state, action) {
            const likedProperties = state.data;
            const indexOf = likedProperties.indexOf(action.payload);
            if (indexOf == -1) {
                likedProperties.push(action.payload);
            } else {
                likedProperties.splice(indexOf, 1);
            }
            state.data = likedProperties;
            cookie.set('allLikedProperties', state.data, {
                path: '/',
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });
        },
    },
});

export default likedPropertiesSlice.reducer;
export const { changeLikedProperties, loadLikedProperties } = likedPropertiesSlice.actions;
