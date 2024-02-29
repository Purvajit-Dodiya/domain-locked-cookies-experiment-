import React, { useEffect, useState } from "react";
import axios from "axios";
import { refreshToken } from "./tokenRefresh"; // Adjust the import path as necessary

axios.defaults.withCredentials = true;

const Protected = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("called fetchData");
      try {
        const response = await axios.get("http://localhost:3000/protected");
        if (response.data.success) {
          setData(response.data.msg);
        } else {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            await fetchData();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        const refreshSuccess = await refreshToken();
        if (refreshSuccess) {
          await fetchData();
        }
      }
    };

    fetchData();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      localStorage.removeItem("email");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {data ? (
        <div>
          <h1>{data}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Protected;
