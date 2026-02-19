import styles from "./Register.module.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await register(formData);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
        <Link to="/login" className={styles.btnPrimary}>
          Log In
        </Link>
      </header>

      <h1 className={styles.heading}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="firstName" className={styles.label}>
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
          className={styles.inputField}
        />
        <label htmlFor="lastName" className={styles.label}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Last Name"
          className={styles.inputField}
        />
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

        <input
          type="submit"
          value="Create Account"
          disabled={isLoading}
          className={styles.btnSecondary}
        />

        <Link to="/login" className={styles.link}>
          Already a member? Log in
        </Link>
      </form>
    </div>
  );
}
