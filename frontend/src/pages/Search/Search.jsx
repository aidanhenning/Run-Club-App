import styles from "./Search.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Search() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Search</h1>
      </header>

      <main className={styles.content}></main>

      <BottomNav />
    </div>
  );
}
