import React from "react";
import "./login.css";
import { useState, useEffect, useReducer, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import "axios" from axios;
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // hit the API from here
    console.log("the form was submitted");
  };
  return (
    <div>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>

        <Link to="/">
          <button className="sign-up">Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
