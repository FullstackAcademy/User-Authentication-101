import { useState } from "react";
import axios from "axios";
import { useTokenContext } from "../TokenContext";
import styles from "./Authenticate.module.css";
export default function Authenticate() {
  const { token } = useTokenContext();
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  async function handleClick() {
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(response?.data?.data?.username);
      setSuccessMessage(response.data.message);
    } catch (error) {
        
      setError(error.message);
    }
  }

  return (
    <div className={styles.Authenticate}>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>For Username: {username}</p>}
      {error && <p>{error}</p>}
      <button type="button" onClick={handleClick}>
        Authenticate
      </button>
    </div>
  );
}
