import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export default function Signup() {
  const password = useRef();
  const passwordConfirm = useRef();
  const name = useRef();
  const Age = useRef();
  const country = useRef();
  const Profession = useRef();
  const email = useRef();
  const city = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      password.current.setCustomValidity("passwords dont match");
    }
    try {
      const newUser = {
        name: name.current.value,
        Age: Age.current.value,
        email: email.current.value,
        password: password.current.value,
        passwordConfirm: passwordConfirm.current.value,
        country: country.current.value,
        city: city.current.value,
        Profession: Profession.current.value,
      };

      console.log(newUser);

      const res = await axios.post(
        "http://127.0.0.1:8700/api/v1/user/signup",
        newUser
      );
      console.log("res.data : ", res.data);
    } catch (error) {
      // console.log
      console.log("error : ", error);
    }
  };
  return (
    <div>
      <div>
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <input type="text" placeholder="name" id="name" ref={name} />
          <input type="number" placeholder="Age" id="Age" ref={Age} />

          <input type="text" placeholder="Email" id="username" ref={email} />

          <input
            type="password"
            placeholder="Password"
            id="password"
            ref={password}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            id="passwordConfirm"
            ref={passwordConfirm}
          />

          <input type="text" placeholder="country" ref={country} />
          <input type="text" placeholder="city" ref={city} />
          <input type="text" placeholder="Profession" ref={Profession} />

          <button className="sign-up" type="submit">
            Sign Up
          </button>

          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
