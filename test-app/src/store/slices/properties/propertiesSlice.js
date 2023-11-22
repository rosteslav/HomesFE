import { createSlice } from '@reduxjs/toolkit';
import { addAllProperties, createProperty } from './propertiesThunk';

const initialState = {
    isLoading: false,
    data: {
        all: [],
    },
    error: null,
};

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    extraReducers(builder) {
        builder.addCase(addAllProperties.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addAllProperties.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data.all = action.payload;
        });
        builder.addCase(addAllProperties.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(createProperty.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createProperty.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data.all.push(action.payload);
        });
        builder.addCase(createProperty.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default propertiesSlice.reducer;
export const selectedProperties = (state) => state.properties;