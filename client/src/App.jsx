import React, { Component } from "react";
import axios from "axios";
import Router from "react-router-dom";
axios.defaults.withCredentials = true;

class App extends Component {
  getCookie() {
    axios
      .get("http://localhost:3000/create")
      .then((res) => console.log("Create", res.data));
  }

  deleteCookie() {
    axios
      .get("http://localhost:3000/delete")
      .then((res) => console.log("Delete", res.data));
  }

  render() {
    return (
      <section>
        <button onClick={this.getCookie}>Create token</button>
        <br />
        <br />
        <button onClick={this.deleteCookie}>Delete token</button>
      </section>
    );
  }
}

export default App;
