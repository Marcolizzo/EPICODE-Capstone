import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../client/client";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const LoginForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({});

  const client = new AxiosClient();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
      e.preventDefault()
      const response = await client.post('/login', formData)
      if (response.token) {
          localStorage.setItem('auth', JSON.stringify(response.token))
          setTimeout(() => {
              navigate('/home')
          }, 1500)
      }
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase text-center">
                  Login
                </h2>
                <p className=" mb-5">Please enter your login and password!</p>
                <div className="mb-3">
                  <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
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
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div onClick={() => toggleForm()} className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a href="#" className="text-primary fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
