import axios from "axios";

const API_URL = '/api/todos/'

//create a todo
const createTodo = async (todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, todoData, config);
    return response.data
}

// get all todos
const getTodos = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const todosService = {
    createTodo,
    getTodos
}

export default todosService