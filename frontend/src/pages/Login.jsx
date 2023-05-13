import { FaSignInAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

function Login() {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {

    if (isSuccess || user) {
      navigate('/');
    }

    if(navigate){
      dispatch(reset());
    }
    
  }, [isSuccess, user, dispatch, navigate])

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData));
  }

  return (
    <>
      <section className="bg-light text-dark p-4">
        <div className="container">
          <h3 className="text-center text-success"><FaSignInAlt /> Login</h3>
          <div className="row justify-content-center">
            <div className="col-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"
                    name='email' value={email} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"
                    name='password' value={password} onChange={handleChange} required/>
                </Form.Group>
                {isLoading && <Loader />}
                {isError && (
                  <Message message={message} />
                )}
                <Button variant="success" type="submit" className='w-100'>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login