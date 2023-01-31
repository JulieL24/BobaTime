import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SiteNav() {

    return (
        <>
            <Nav>
                <NavLink className="nav-link" to="">
                    <h4>List of Stores</h4>
                </NavLink>
            </Nav>
        </>
    )
}

export default SiteNav; 