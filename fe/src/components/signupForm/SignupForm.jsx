import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap'
import styles from '../loginForm/LoginForm.module.scss'
import { signupUser } from '../../redux/reducers/signupReducer'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ toggleForm }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})
    const signupStatus = useSelector((state) => state.signup.status)
    const error = useSelector((state) => state.signup.error)

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(signupUser(formData))
    }

    useEffect(() => {
        if (signupStatus === 'succeeded') {
            toggleForm(true)
        }
    }, [signupStatus, toggleForm])

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col md={6} lg={6} className={styles.image}>
                    <Image src="https://picsum.photos/700/1000" className="img-fluid" />
                </Col>
                <Col md={12} lg={6} xs={12} className={styles.col}>
                    <div className={styles.card}>
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase text-center">Signup</h2>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error.message && <p>{error.message}</p>}
                                        {error.errors && (
                                            <ul>
                                                {error.errors.map((errorItem, index) => (
                                                    <li key={index}>{errorItem.msg}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <Form onSubmit={onSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Label className="text-center">First Name</Form.Label>
                                            <Form.Control
                                                onChange={onChangeInput}
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter First Name"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Label className="text-center">Last Name</Form.Label>
                                            <Form.Control
                                                onChange={onChangeInput}
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter Last Name"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label className="text-center">Username</Form.Label>
                                            <Form.Control
                                                onChange={onChangeInput}
                                                type="text"
                                                name="username"
                                                placeholder="Enter Username"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">Email address</Form.Label>
                                            <Form.Control
                                                onChange={onChangeInput}
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                onChange={onChangeInput}
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                                Sign up
                                            </Button>
                                        </div>
                                    </Form>
                                    <div onClick={() => toggleForm()} className="mt-3">
                                        <p className="mb-0  text-center">
                                            Already rigistered?{' '}
                                            <a href="#" className="text-primary fw-bold">
                                                Login
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupForm
