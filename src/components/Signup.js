import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Button } from 'react-bootstrap';


function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setName] = useState("")
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        setName('');

        try {
            const response = await axios.post("http://localhost:8000/signup", { fullname, email, password });
            if (response.status === 201) {
                toast.success("User registered successfully");
                navigate("/")
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Email already exists");
            } else {
                toast.error("An error occurred");
            }
        }
    };

    return (
        <Container className='d-flex justify-content-center align-items-center mt-5'>
            <ToastContainer />
            <Row className="justify-content-center">
                <h3 className='align-items-center text-center mb-5 '>Register Now!</h3>
                <Form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "30px", maxWidth: "400px" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={handleNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </Form.Group>
                    <Button className='mt-3' variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </Row>
        </Container>



    )
}

export default Signup