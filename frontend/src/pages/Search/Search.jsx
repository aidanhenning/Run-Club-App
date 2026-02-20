import styles from "./Search.module.css";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Search() {
  return (
    <div className={styles.container}>
      <Header title="Search" />

      <main className={styles.content}></main>

      <BottomNav />
    </div>
  );
}
