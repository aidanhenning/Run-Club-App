import React from "react";
import styles from "./Register.module.css";
import LoginHeader from "../../components/Header/LoginHeader";
import { Link } from "react-router";

export default function Register() {
  return (
    <>
      <LoginHeader />
      <h1 className={styles.loginHeading}>Register</h1>
      <form className={styles.loginForm}>
        <label htmlFor="fName" className={styles.label}>
          First Name
        </label>
        <input
          type="text"
          id="fName"
          required
          placeholder="First Name"
          className={styles.inputField}
        />
        <label htmlFor="lName" className={styles.label}>
          Last Name
        </label>
        <input
          type="text"
          id="lName"
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
        <input
          type="submit"
          value="Create Account"
          className={styles.btnSecondary}
        />
        <Link to="/login" className={styles.link}>
          Already a member? Log in
        </Link>
      </form>
    </>
  );
}
