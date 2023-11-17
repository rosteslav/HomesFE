import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    propertieState: {}
};

const getPropertieSlice = createSlice({
    name: 'propertie',
    initialState,
    reducers: {
        setPropertie: (state, action) => {
            state.propertieState = action.payload;
        }
    }
});

export const { setPropertie } = getPropertieSlice.actions;

export const selectedPropertie = (state) => state.propertie.propertieState;

export default getPropertieSlice.reducer;
