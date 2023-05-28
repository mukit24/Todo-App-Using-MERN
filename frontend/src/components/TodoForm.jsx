import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todos/todosSlice';

const TodoForm = (e) => {
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const todoData = {
            title: title
        }
        dispatch(createTodo(todoData));
        setTitle('');
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <section className='mb-3'>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title"
                                name='title' value={title} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit" className='w-100'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default TodoForm