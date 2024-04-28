import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/loginReducer";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggleForm, signupSuccessful }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const isLoading = useSelector((state) => state.login.isLoading);
  const error = useSelector((state) => state.login.error);
  const status = useSelector((state) => state.login.status);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (status === "succeeded" && !isLoading) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [status]);

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

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {signupSuccessful && !error && !isLoading && (
                  <div className="alert alert-success" role="alert">
                    You've successfully signed up! Please enter your email and
                    password for login.
                  </div>
                )}

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
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Login"}
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
