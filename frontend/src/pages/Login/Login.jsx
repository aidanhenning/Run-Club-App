import React from "react";
import styles from "./Login.module.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <Header />
      <h1 className={styles.loginHeading}>Log In</h1>
      <form className={styles.loginForm}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
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
          required
          placeholder="Enter Password"
          className={styles.inputField}
        />
        <div className={styles.checkboxField}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Stay Signed In?</label>
        </div>
        <input type="submit" value="Sign In" className={styles.btnSecondary} />
        <Link to="/register" className={styles.link}>
          Create a New Account
        </Link>
      </form>
    </>
  );
}
