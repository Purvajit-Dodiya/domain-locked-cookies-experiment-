import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  function getCookie() {
    axios
      .get("http://localhost:3000/create")
      .then((res) => console.log("Created", res));
  }
  function deleteCookie() {
    axios
      .get("http://localhost:3000/delete")
      .then((res) => console.log("deleted", res));
  }

  return (
    <section>
      <button onClick={getCookie}>Create token</button>
      <br />
      <br />
      <button onClick={deleteCookie}>Delete token</button>
    </section>
  );
}

export default App;
