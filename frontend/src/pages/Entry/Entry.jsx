import React from "react";
import styles from "./Entry.module.css";
import { Link } from "react-router";

export default function Entry() {
  return (
    <>
      <div className={styles.entryBackgroundDiv}>
        <div className={styles.entryBackgroundFade}></div>
      </div>
      <div className={styles.entryContent}>
        <div className={styles.entryText}>
          <h1 className={styles.stackedHeading}>
            <span>Community</span>
            <span>Driven</span>
            <div className={styles.highlight}></div>
          </h1>
          <h2 className={styles.subheading}>Five @ Six</h2>
        </div>
        <Link to="/login" className={styles.btnSecondary}>
          Get Started
        </Link>
      </div>
    </>
  );
}
