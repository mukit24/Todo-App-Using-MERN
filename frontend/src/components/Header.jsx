import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaUser, FaList, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>My Todo App</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to={'/'}>
                            <Nav.Link ><FaList /> Dashboard</Nav.Link>
                        </LinkContainer>
                        {user ? (
                            <Nav.Link onClick={onLogOut}><FaSignOutAlt /> Logout</Nav.Link>
                        ) : (
                            <>
                                <LinkContainer to={'/login'}>
                                    <Nav.Link ><FaSignInAlt /> Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={'/register'}>
                                    <Nav.Link ><FaUser /> Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header