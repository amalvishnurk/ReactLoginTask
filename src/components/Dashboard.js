import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard() {

    const navigate = useNavigate()
    const [userName, setuserName] = useState("")
    useEffect(() => {
        const storedUserName = localStorage.getItem('username');
        if (storedUserName) {
            setuserName(storedUserName);
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem("username")
        toast.success("Logout successfully")
        setTimeout(() => navigate("/"), 1000);

    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <ToastContainer />

                    <Navbar.Brand href="#home">Brand Name</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#link">Contact</Nav.Link>
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>

                <div className="mt-5">
                    Hi {userName}!
                    <p>Welcome to Dashboard</p>
                </div>
            </Container>
        </>

    )
}

export default Dashboard