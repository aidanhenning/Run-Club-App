import styles from "./Clubs.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Clubs() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Clubs</h1>
      </header>

      <main className={styles.content}></main>

      <BottomNav />
    </div>
  );
}
