import { createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (data) => {
    return login(data);
});

export const registerUser = createAsyncThunk('auth/register', async (data) => {
    return register(data);
});
