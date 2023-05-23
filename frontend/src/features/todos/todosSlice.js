import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todosService from "./todosService";

const initialState = {
    todos: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// create todo
export const createTodo = createAsyncThunk('todo/create', async (todoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await todosService.createTodo(todoData, token)
    } catch (error) {
        console.log(error.response.data.message);
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

// create todo
export const getTodos = createAsyncThunk('todo/getAll', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await todosService.getTodos(token)
    } catch (error) {
        console.log(error.response.data.message);
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: initialState,
    },
    extraReducers:{
        [createTodo.pending]: (state) => {
            state.isLoading = true
        },
        [createTodo.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos.push(action.payload)
        },
        [createTodo.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [getTodos.pending]: (state) => {
            state.isLoading = true
        },
        [getTodos.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }
    }
})

export const {reset} = todoSlice.actions;
export default todoSlice.reducer;