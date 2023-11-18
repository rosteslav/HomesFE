import { createSlice } from '@reduxjs/toolkit';
import { addAllProperties } from './propertiesThunk';

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
    },
});

export default propertiesSlice.reducer;
