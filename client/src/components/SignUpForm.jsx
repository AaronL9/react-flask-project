import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Loader from "./Loader";

export default function SignUpForm() {
  const { signup, isLoading , error } = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="signup-form">
        <div className="title">Signup</div>
        <form onSubmit={handleSignUp}>
          <div className="input-boxes">
            <div className="input-box">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Enter your name"
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Enter your email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Enter your password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="error">
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "#ff3333" }}
                ></i>
                {error}
              </p>
            )}
            <div className="button input-box">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="text sign-up-text">
              Already have an account? <label htmlFor="flip">Login now</label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
