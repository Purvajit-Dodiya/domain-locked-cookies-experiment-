// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Protected from "./Protected";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  function getCookie() {
    axios
      .get("http://localhost:3000/create")
      .then((res) => console.log("Create", res.data));
  }

  function deleteCookie() {
    axios
      .get("http://localhost:3000/delete")
      .then((res) => console.log("Delete", res.data));
  }
  const loginHandler = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      console.log(response.data.Logedin);
      if (response.data.Logedin) {
        localStorage.setItem("email", email);
        window.location.href = "/protected";
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors, e.g., show a message to the user
    }
  };

  const logoutHandler = () => {};

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Log in
              </button>
              <button onClick={getCookie}>Create token</button>
              <button onClick={deleteCookie}>Delete token</button>
            </div>
          }
        />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route
          path="/protected"
          element={<Protected onLogout={logoutHandler} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
