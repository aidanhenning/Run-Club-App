import React from "react";
import styles from "./Home.module.css";
import BottomNav from "../../components/BootomNav/BottomNav";

export default function Home() {
  return (
    <>
      <header className={styles.homeHeader}>
        <h1 className={styles.homeHeaderText}>Home</h1>
      </header>
      <main className={styles.homeContent}>
        <article className={styles.homePost}>
          <div></div>
        </article>
      </main>
      <BottomNav />
    </>
  );
}
