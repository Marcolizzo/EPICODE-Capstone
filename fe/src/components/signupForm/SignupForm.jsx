import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { signupUser } from "../../redux/reducers/signupReducer";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const signupStatus = useSelector((state) => state.signup.status);
  const error = useSelector((state) => state.signup.error);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (signupStatus === "succeeded") {
      toggleForm(true);
    }
  }, [signupStatus, toggleForm]);

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
                  Signup
                </h2>

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
                      <Form.Label className="text-center">
                        First Name
                      </Form.Label>
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
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Sign up
                      </Button>
                    </div>
                  </Form>
                  <div onClick={() => toggleForm()} className="mt-3">
                    <p className="mb-0  text-center">
                      Already rigistered?{" "}
                      <a href="#" className="text-primary fw-bold">
                        Login
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

export default SignupForm;
