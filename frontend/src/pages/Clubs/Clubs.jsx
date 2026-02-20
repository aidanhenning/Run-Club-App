import styles from "./Clubs.module.css";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Clubs() {
  return (
    <div className={styles.container}>
      <Header title="Clubs" />

      <main className={styles.content}></main>

      <BottomNav />
    </div>
  );
}
