import { createAsyncThunk } from '@reduxjs/toolkit';
import { createProp, getAllProp, getSelectedProperty } from '../../../services/api';

export const addAllProperties = createAsyncThunk('propertiesAll/get', async () => {
    return getAllProp();
});
export const createProperty = createAsyncThunk('createProperty/post', async (data) => {
    return createProp(data);
});

export const addSelectedProperty = createAsyncThunk('selectedProperty/get', async (id) =>
    getSelectedProperty(id)
);
