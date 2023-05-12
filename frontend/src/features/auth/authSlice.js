import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        console.log(error.response.data.message);
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''
        }
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.isLoading = true
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        }
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;