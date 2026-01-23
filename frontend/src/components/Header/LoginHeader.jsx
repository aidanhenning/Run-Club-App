import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/login" className={styles.btnPrimary}>
        Log In
      </Link>
    </header>
  );
}
