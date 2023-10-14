import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Loader from "./Loader";

export default function LoginForm() {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="login-form">
        <div className="title">Login</div>
        <form onSubmit={handleLogin}>
          <div className="input-boxes">
            <div className="input-box">
              <i className="fas fa-envelope" />
              <input
                type="text"
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
              <input type="submit" value="Login" />
            </div>
            <div className="text sign-up-text">
              Don't have an account? <label htmlFor="flip">Sigup now</label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
