import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

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
    extraReducers: () => { },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;