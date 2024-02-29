// Login.js
import React from "react";

const Login = ({ onLogin }) => {
  function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginpassword").value;
    onLogin(email, password);
  }
  return (
    <div>
      <h1>Login</h1>
      <input id="loginEmail" type="text" placeholder="Email" />
      <br />
      <input id="loginpassword" type="password" placeholder="Password" />
      <br />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default Login;
