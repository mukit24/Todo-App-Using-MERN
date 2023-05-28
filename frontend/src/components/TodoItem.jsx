import React from 'react';
import { Badge, Card } from 'react-bootstrap';

const TodoItem = ({ todo }) => {
    return (
        <Card className='mb-2'>
            <Card.Body>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{todo.title}</h5>
                    <small>{new Date(todo.createdAt).toLocaleDateString('en-US')}</small>
                </div>
                {todo.complete ? (
                    <p><Badge bg='success'>Completed</Badge></p>
                ) : (
                    <p><Badge bg='danger'>Incomplete</Badge></p>
                )}
            </Card.Body>
        </Card>
    )
}

export default TodoItem