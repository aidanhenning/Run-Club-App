import styles from "@/pages/Login/Login.module.css";
import { useAuth } from "@/context/AuthContext";

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

export default function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (token) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/register" className={styles.btnPrimary}>
          Sign Up
        </Link>
      </header>

      <h1 className={styles.heading}>Log In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter Email"
          className={styles.inputField}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
          className={styles.inputField}
        />

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.checkboxField}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Stay Signed In?</label>
        </div>

        <input
          type="submit"
          value="Sign In"
          disabled={loading}
          className={styles.btnSecondary}
        />

        <Link to="/register" className={styles.link}>
          Create a New Account
        </Link>
      </form>
    </div>
  );
}
