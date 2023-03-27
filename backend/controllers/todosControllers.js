const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel');
// @desc get todos
// @route GET api/todos/
// @access private
const getTodos = asyncHandler(async(req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
})

// @desc set todo
// @route POST api/todos/
// @access private
const setTodo = asyncHandler(async(req, res) => {

    if (!req.body.title){
        res.status(400).json({ message : 'A todo must contain a name field.'})
    }

    const todo = await Todo.create({
        title : req.body.title,
    })
    res.status(200).json(todo);
})

// @desc update todo
// @route PUT api/todos/:id
// @access private
const updateTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo){
        res.status(400).json({ message : 'Todo Not Found'})
    }

    const updTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updTodo);
})

// @desc delete todo
// @route DELETE api/todos/:id
// @access private
const deleteTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo){
        res.status(400).json({ message : 'Todo Not Found'})
    }
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({id : req.params.id });
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}