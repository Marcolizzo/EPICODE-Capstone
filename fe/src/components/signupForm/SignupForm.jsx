import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import AxiosClient from "../../client/client";

const SignupForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();

  const client = new AxiosClient();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.statusCode === 201) {
        toggleForm();
      }
  
      return response;
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
  
        // Set error state with error message(s) from server response
        if (Array.isArray(error.response.data.errors)) {
          setError(error.response.data.errors.map((error) => error.msg));
        } else if (typeof error.response.data.message === "string") {
          setError([error.response.data.message]);
        } else {
          setError(["An error occurred while processing your request."]);
        }
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
  
        // Set error state with generic error message
        setError(["An error occurred while processing your request."]);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
  
        // Set error state with generic error message
        setError(["An error occurred while processing your request."]);
      }
      console.log(error);
    }
  };

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
                    <ul>
                      {error.map((errorMessage, index) => (
                        <li key={index}>{errorMessage}</li>
                      ))}
                    </ul>
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
