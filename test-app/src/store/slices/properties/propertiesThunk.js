import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProp } from '../../../services/api';

export const addAllProperties = createAsyncThunk('propertiesAll/get', async () => {
    return getAllProp();
});
