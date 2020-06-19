import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubblepage");
      })
      .catch((err) => {
        setCredentials({
          username: "",
          password: "",
        });
        console.log("Username or password incorrect", err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            name="password"
            value={credentials.password}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
