import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../redux/reducers/loginReducer'
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap'
import styles from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ toggleForm, signupSuccessful }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const isLoading = useSelector((state) => state.login.isLoading)
    const error = useSelector((state) => state.login.error)
    // const status = useSelector((state) => state.login.status)

    const onSubmit = async (e) => {
        e.preventDefault()
        const login = await doDispatch(loginUser(formData))
        if (login.payload.statusCode === 200 && !isLoading) {
            navigate('/home')
        }
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col md={6} lg={6} className={styles.image}>
                        <Image src="https://picsum.photos/700/1000" className="img-fluid" />
                    </Col>

                    <Col md={12} lg={6} xs={12} className={styles.col}>
                        <div className={styles.card}>
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
                                    <p className="text-center">Please enter your login and password!</p>

                                    {error && (
                                        <div className={`${styles.alert} ${styles.failed}`} role="alert">
                                            {error}
                                        </div>
                                    )}

                                    {signupSuccessful && !error && !isLoading && (
                                        <div className={`${styles.alert} ${styles.success}`} role="alert">
                                            You've successfully signed up! Please enter your email and password for
                                            login.
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <Form onSubmit={onSubmit} className="mt-5">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">Email address</Form.Label>
                                                <Form.Control
                                                    onChange={onChangeInput}
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter email"
                                                    autoComplete="on"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    onChange={onChangeInput}
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                />
                                            </Form.Group>
                                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <p className="small">
                                                <a className="text-primary" href="#!">
                                                    Forgot password?
                                                </a>
                                            </p>
                                        </Form.Group> */}
                                            <div className="d-grid mt-5">
                                                <Button variant="primary" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Loading...' : 'Login'}
                                                </Button>
                                            </div>
                                        </Form>
                                        <div onClick={() => toggleForm()} className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{' '}
                                                <a href="#" className="text-primary fw-bold">
                                                    Sign Up
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
        </>
    )
}

export default LoginForm
