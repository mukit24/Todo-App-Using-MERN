import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { getTodos, reset } from '../features/todos/todosSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import TodoItem from '../components/TodoItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { todos, isLoading, isError, message } = useSelector(state => state.todo);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getTodos());
    
  }, [user, navigate, dispatch])
  

  return (
    <div className="bg-light p-3">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <h3 className='text-center'>Welcome {user.name}</h3>
          <h4 className='text-center text-secondary'>Todo Dashboard</h4>
          <TodoForm />
          {isLoading && <Loader />}
          {isError && <Message message={message}/>}
          {todos.length > 0 ? (
            <div>
              {todos.map(todo => <TodoItem key={todo._id} todo={todo}/>)}
            </div>
          ) : (
            <h3>You have no Todos</h3>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard