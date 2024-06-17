import { useState } from "react";
import axios from "axios";
import { useTokenContext } from "../TokenContext";
import styles from './SignUp.module.css'
export default function SignUpForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    error: null,
  });
  const { setToken } = useTokenContext();
  function update(event){
    setForm((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
      const data = response.data;
      setToken(data.token);
      setForm({
        username: "",
        password: "",
        error: null,
      });
      
    } catch (error)  {
      setForm((prev) => ({
        ...prev,
        error: error.message,
      }))
  }};
  return (
    <div className={styles.formGroup}>
      <h2>Sign Up!</h2>
      {form.username.length < 8 && form.username.length > 0 && (
        <small>Username must be at least 8 characters</small>
      )}
      {form.error && <p>{form.error}</p>}
      <form className="signUpForm" onSubmit={handleSubmit}>
        <label className={styles.label}>
          {" "}
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={update}
            pattern="^[A-Za-z0-9]{3,16}$"
            required
            className="inputs"
          />
          <br />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            required
            className="inputs"
          />
        </label>
        <br></br>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
}
