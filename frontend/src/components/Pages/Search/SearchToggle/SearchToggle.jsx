import styles from "@/components/Pages/Search/SearchToggle/SearchToggle.module.css";

export default function SearchToggle({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabGroup}>
      <button
        className={`${styles.tab} ${activeTab === "people" ? styles.activeTab : ""}`}
        onClick={() => setActiveTab("people")}
      >
        People
      </button>
      <button
        className={`${styles.tab} ${activeTab === "clubs" ? styles.activeTab : ""}`}
        onClick={() => setActiveTab("clubs")}
      >
        Clubs
      </button>
    </div>
  );
}
