import React from "react";
import "../assets/login.css";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function AuthForm() {

  return (
    <div className="login-background">
      <div className="login-container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src="/login-img.jpg" alt="" />
            <div className="text">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            {/*<img class="backImg" src="images/backImg.jpg" alt="">*/}
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <LoginForm />
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
