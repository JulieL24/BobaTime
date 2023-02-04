import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useToken } from './LoginToken';

function SiteNav() {
    const [token] = useToken()

    return (
        <>
            <Navbar className="nav-bg-color fixed-top" expand="md">
                <NavLink className="nav-link boba-logo" to="/">
                    <img
                    src={require('./images/logo.jpeg')}
                    width="auto"
                    height="68"
                    alt="Boba Time logo"
                />
                </NavLink>
                <Container>
                    <Nav>
                        <NavLink className="nav-link" to="">
                            <h4>List of Stores</h4>
                        </NavLink>
                    </Nav>
                    <Nav>
                        {/* <NavLink className= {token ? 'nav-link' : 'd-none'} to="/profile">Profile</NavLink> */}
                        <NavLink className='nav-link' to="/profile">Profile</NavLink>
                        <NavLink className={token ? 'd-none' : 'nav-link'} to="/login">Login</NavLink>
                        <NavLink className={token ? 'd-none' : 'nav-link'} to="/signup">Signup</NavLink>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default SiteNav; 