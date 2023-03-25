const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message : 'Get Todos'});
})

router.post('/', (req, res) => {
    res.status(200).json({message : 'Set Todo'});
})

router.put('/:id', (req, res) => {
    res.status(200).json({message : `Update todo ${req.params.id}`});
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message : `Delete todo ${req.params.id}`});
})
module.exports = router;