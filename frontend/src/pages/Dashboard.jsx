import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { getTodos } from '../features/todos/todosSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { todos, isLoading, isError, message} = useSelector(state => state.todo);

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
    dispatch(getTodos());
  }, [user, navigate])

  return (
    <div className="bg-light p-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className='text-center'>Welcome {user.name}</h3>
          <h4 className='text-center text-secondary'>Todo Dashboard</h4>
          <TodoForm />
        </div>
      </div>
    </div>
  )
}

export default Dashboard