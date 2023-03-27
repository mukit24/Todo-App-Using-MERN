const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please Add a Tiltle of Todo']
    },
    complete : {
        type: Boolean,
        default: false
    }
},
{ timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);