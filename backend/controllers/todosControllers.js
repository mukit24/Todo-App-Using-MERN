// @desc get todos
// @route GET api/todos/
// @access private
const getTodos = (req, res) => {
    res.status(200).json({message : 'Get Todos'});
}

// @desc set todo
// @route POST api/todos/
// @access private
const setTodo = (req, res) => {

    if (!req.body.name){
        res.status(400).json({ message : 'A todo must contain a name field.'})
    }

    res.status(200).json({message : 'Set Todo'});
}

// @desc update todo
// @route PUT api/todos/:id
// @access private
const updateTodo = (req, res) => {
    res.status(200).json({message : `Update todo ${req.params.id}`});
}

// @desc delete todo
// @route DELETE api/todos/:id
// @access private
const deleteTodo = (req, res) => {
    res.status(200).json({message : `Delete todo ${req.params.id}`});
}

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}