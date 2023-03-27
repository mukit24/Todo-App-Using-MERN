const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDb = require('./config/db');

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/todos', require('./routes/todosRoutes'));

app.listen(port, () => console.log(`Server is running on port ${port}`));