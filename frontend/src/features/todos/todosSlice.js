import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: initialState,
    }
})

export const {reset} = todoSlice.actions;
export default todoSlice.reducer;