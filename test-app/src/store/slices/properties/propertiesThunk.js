import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createProp,
    delImg,
    getAllImg,
    getAllProp,
    getOwnProperties,
    getSelectedProperty,
    uploadImg,
} from '../../../services/api';

export const addAllProperties = createAsyncThunk('propertiesAll/get', async () => {
    return getAllProp();
});
export const createProperty = createAsyncThunk('createProperty/post', async (data) => {
    return createProp(data);
});

export const addSelectedProperty = createAsyncThunk('selectedProperty/get', async (id) =>
    getSelectedProperty(id)
);

export const addOwnProperty = createAsyncThunk('propertiesOwn/get', async () =>
    getOwnProperties()
);

export const uploadImage = createAsyncThunk('uploadImage/post', async (data) => {
    return uploadImg(data.responseId, data.undefined, data.formData);
});
export const deleteImage = createAsyncThunk('deleteImage/del', async (id) => {
    return delImg(id);
});
export const getPropertyImages = createAsyncThunk('getPropertyImages/get', async (id) => {
    return getAllImg(id);
});
