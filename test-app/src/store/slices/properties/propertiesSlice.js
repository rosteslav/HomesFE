import { createSlice } from '@reduxjs/toolkit';
import {
    addAllProperties,
    addOwnProperty,
    addSelectedProperty,
    createProperty,
    deleteImage,
    uploadImage,
} from './propertiesThunk';

const initialState = {
    isLoading: false,
    data: {
        all: [],
        selectedProperty: {},
        ownProperties: [],
    },
    error: null,
    fetcher: {
        all: false,
        ownProperties: false,
    },
};

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        addProperty: (state, action) => {
            state.data.all.push(action.payload);
        },
        clearOwnProperties: (state) => {
            state.data.ownProperties = [];
        },
        addOwnProperties: (state, action) => {
            state.data.ownProperties.push(action.payload);
        },
        fetchAllProperties: (state) => {
            state.fetcher.all = true;
        },
        fetchOwnProperties: (state) => {
            state.fetcher.ownProperties = true;
        },
        resetFetcher: (state) => {
            state.fetcher.ownProperties = false;
        },
        addImageOwnProperties: (state, action) => {
            const lastProp = state.data.ownProperties.length - 1;
            state.data.ownProperties[lastProp].images.push(action.payload.imageUrl);
        },
        addImageAllProperties: (state, action) => {
            const lastProp = state.data.all.length - 1;
            state.data.all[lastProp].images.push(action.payload.imageUrl);
        },
        delImageOwnProperties: (state, action) => {
            const lastProp = state.data.ownProperties.length - 1;
            state.data.ownProperties[lastProp].images = action.payload.filter((i) => i !== 'del') || [];
        },
        delImageAllProperties: (state, action) => {
            const lastProp = state.data.all.length - 1;
            state.data.all[lastProp].images = action.payload.filter((i) => i !== 'del') || [];
        }
    },
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
        builder.addCase(createProperty.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(createProperty.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addSelectedProperty.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addSelectedProperty.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data.selectedProperty = action.payload;
        });
        builder.addCase(addSelectedProperty.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addOwnProperty.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addOwnProperty.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(addOwnProperty.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(uploadImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteImage.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(deleteImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default propertiesSlice.reducer;
export const {
    clearOwnProperties,
    fetchAllProperties,
    fetchOwnProperties,
    resetFetcher,
    addProperty,
    addOwnProperties,
    addImageOwnProperties,
    delImageOwnProperties,
    addImageAllProperties,
    delImageAllProperties
} = propertiesSlice.actions;
export const selectedProperties = (state) => state.properties;
