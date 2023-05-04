import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaUser, FaList } from 'react-icons/fa';

function Header() {
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
                        <LinkContainer to={'/login'}>
                            <Nav.Link ><FaSignInAlt /> Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/register'}>
                            <Nav.Link ><FaUser /> Register</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header