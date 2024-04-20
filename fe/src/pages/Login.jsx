import React, { useState } from "react";
import LoginForm from "../components/loginForm/LoginForm";
import SignupForm from "../components/signupForm/SignupForm";

const Login = () => {
    const [showSignupForm, setShowSignupForm] = useState(false)

    const toggleForm = () => setShowSignupForm(!showSignupForm)

  return (
    <div className="container">
          <div className="card my-5">
            {showSignupForm ? (
              <SignupForm toggleForm={toggleForm} />
            ) : (
              <LoginForm toggleForm={toggleForm} />
            )}
          </div>
    </div>
  );
};

export default Login;
