import { createAsyncThunk } from '@reduxjs/toolkit';

import { adminRegister, login, register } from '../../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (data) => {
    return login(data);
});

export const registerUser = createAsyncThunk('auth/register', async (data) => {
    return register(data);
});

export const registerAdmin = createAsyncThunk('auth/admin/register', async (data) => {
    return adminRegister(data);
});