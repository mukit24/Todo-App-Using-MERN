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

// login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        console.log(error.response.data.message);
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async() => localStorage.removeItem('user') );

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        passwordMatchError: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        },
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
        },
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        },
        [logout.fulfilled]: (state) => {
            state.user = ''
        }
    }
})

export const { reset, passwordMatchError } = authSlice.actions;
export default authSlice.reducer;